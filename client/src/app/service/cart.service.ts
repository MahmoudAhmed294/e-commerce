import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../model/product';
import { environment } from 'src/environments/environment';
import { ProductParams } from '../model/productParams';
import { BehaviorSubject, filter, map } from 'rxjs';
import { IUser } from '../model/user';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl: string = environment.apiUrl;

    cartProducts: ICart[] | null = null;

    private currentCartSize = new BehaviorSubject<number | null>(null);
    currentSize$ = this.currentCartSize.asObservable();

    private user: IUser | null = null;

    constructor(
        private paginationService: PaginationService,
        private http: HttpClient,
        private accountService: AccountService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    addToCart(id: number) {
        this.accountService.currentUser$.subscribe({
            next: (user) => {
                this.user = user;
            },
            error: () => (this.user = null)
        });

        if (this.user) {
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
        this.http.get<string>(`${this.baseUrl}Cart/size`).subscribe({
            next: (res: any) => this.setCurrentSize(res)
        });
    }

    updateCount(quantity: number, id: number) {
        this.http.put<boolean>(`${this.baseUrl}Cart/${id}/quantity/${quantity}`, {}).subscribe({
            next: (res) => console.log(res),
            error: (err) => {
                console.log(err);
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
