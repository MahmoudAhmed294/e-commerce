import { Injectable } from '@angular/core';
import { ProductParams } from '../model/productParams';
import { IProducts } from '../model/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../model/pagination';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    productParams: ProductParams | undefined;
    products: IProducts | undefined;

    constructor(private http: HttpClient) {
        this.productParams = new ProductParams();
    }

    getProductParams() {
        
        return this.productParams;
    }

    setProductParams(params: ProductParams) {
        this.productParams = params;
    }

    resetProductParams() {
        if (this.products) {
            this.productParams = new ProductParams();
            return this.productParams;
        }
        return;
    }

    GetPaginateResult<T>(url: string, params: HttpParams) {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

        return this.http.get<T>(url, { observe: 'response', params }).pipe(
            map((response) => {
                if (response.body) paginatedResult.result = response.body;
                const pagination = response.headers.get('Pagination');
                if (pagination) {
                    paginatedResult.pagination = JSON.parse(pagination);
                }
                return paginatedResult;
            })
        );
    }

    getPaginationHeaders(pageNumber: number, pageSize: number) {
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber);
        params = params.append('pageSize', pageSize);

        return params;
    }
}
