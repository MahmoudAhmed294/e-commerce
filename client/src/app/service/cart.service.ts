import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { IProducts, IProductsDetails } from '../model/product';
import { environment } from 'src/environments/environment';
import { ProductParams } from '../model/productParams';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl: string = environment.apiUrl;
    products: IProducts[] = [];
    private currentCartSize = new BehaviorSubject<string | null>(null);
    currentSize$ = this.currentCartSize.asObservable();

    constructor(private paginationService: PaginationService, private http: HttpClient) {}

    addToCart(id: number) {
        return this.http.post<IProductsDetails>(`${this.baseUrl}Cart/${id}`, {});
    }

    getCountSize() {
        this.http.get<string>(`${this.baseUrl}Cart/size`).subscribe({
            next: (res) => this.setCurrentSize(res)
        });
    }

    setCurrentSize(user: string) {
        this.currentCartSize.next(user);
    }

    getCartsProduct(productParams: ProductParams) {
        let params = this.paginationService.getPaginationHeaders(
            productParams.pageNumber,
            productParams.pageSize
        );

        return this.paginationService
            .GetPaginateResult<IProducts[]>(`${this.baseUrl}Cart`, params)
            .pipe(
                map((res) => {
                    return res;
                })
            );
    }
}
