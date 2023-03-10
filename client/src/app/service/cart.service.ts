import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { IProducts, IProductsDetails } from '../model/product';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl: string = environment.apiUrl;
    cart: IProducts[] = [];

    constructor(private paginationService: PaginationService, private http: HttpClient) {}

    addToCart(id: number) {
        return this.http.post<IProductsDetails>(this.baseUrl + 'Cart/' + id, {});
    }
}
