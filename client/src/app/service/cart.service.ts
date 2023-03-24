import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../model/product';
import { environment } from 'src/environments/environment';
import { ProductParams } from '../model/productParams';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../model/user';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl: string = environment.apiUrl;

    cartProducts: ICart[] | null = null;

    private currentCartSize = new BehaviorSubject<number | null>(null);
    currentSize$ = this.currentCartSize.asObservable();

    constructor(
        private paginationService: PaginationService,
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
        private cookieService: CookieService
    ) {}

    addToCart(id: number) {
        const userString = this.cookieService.get('user');

        if (userString) {
            this.http.post<ICart>(`${this.baseUrl}Cart/${id}`, {}).subscribe({
                next: () => {
                    this.toastr.success('Product added Successfully ');
                    this.getCountSize();
                }
            });
        } else {
            this.toastr.warning('You need to login');
            this.router.navigateByUrl('/login');
        }
    }

    getCountSize() {
        this.http.get<number>(`${this.baseUrl}Cart/size`).subscribe({
            next: (res: any) => this.setCurrentSize(res)
        });
    }

    updateCount(quantity: number, id: number) {
        this.http.put<boolean>(`${this.baseUrl}Cart/${id}/quantity/${quantity}`, {}).subscribe({
            next: (res) => console.log(res),
            error: (_) => {
                this.toastr.error('error happened');
            }
        });
    }

    setCurrentSize(count: number) {
        this.currentCartSize.next(count);
    }

    getCartsProduct(productParams: ProductParams) {
        let params = this.paginationService.getPaginationHeaders(
            productParams.pageNumber,
            productParams.pageSize
        );

        return this.paginationService
            .GetPaginateResult<ICart[]>(`${this.baseUrl}Cart`, params)
            .pipe(
                map((value: any) => {
                    this.cartProducts = [...value.result];
                    return value.pagination;
                })
            );
    }

    deleteCartProduct(productId: number, productParams: ProductParams) {
        this.http.delete<boolean>(`${this.baseUrl}Cart/${productId}`).subscribe({
            next: () => {
                this.getCartsProduct(productParams);
                this.getCountSize();
                this.toastr.success('the product has remove from cart');
            },
            error: () => this.toastr.error('error happened')
        });
    }
}
