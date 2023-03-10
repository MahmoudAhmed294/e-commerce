import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducts, IProductsDetails } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { PaginationService } from './pagination.service';
import { ProductParams } from '../model/productParams';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    baseUrl: string = environment.apiUrl;
    products: IProducts[] = [];

    constructor(private paginationService: PaginationService, private http: HttpClient) {}

    getProducts(productParams: ProductParams) {
        let params = this.paginationService.getPaginationHeaders(
            productParams.pageNumber,
            productParams.pageSize
        );

        return this.paginationService
            .GetPaginateResult<IProducts[]>(this.baseUrl + 'Products', params)
            .pipe(
                map((res) => {
                    return res;
                })
            );
    }

    getProduct(id: string) {
        return this.http.get<IProductsDetails>(this.baseUrl + 'Products/' + id);
    }
}
