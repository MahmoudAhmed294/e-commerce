import { Injectable } from '@angular/core';
import { ICart } from '../model/product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../model/order';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    orderProduct: ICart[] | undefined;
    total: number = 0;
    shippingCost: number = 0;
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

    makeOrder(order: IOrder) {
        return this.http.post(`${this.baseUrl}Order`, order).subscribe({
            next: () => this.router.navigateByUrl('/')
        });
    }

    setOrderProduct(product: ICart[]): void {
        if (product) {
            this.orderProduct = product;
        }
    }

    setOrderTotal(cost: number): void {
        if (cost) {
            this.total = cost;
        }
    }

    setOrderShippingCost(cost: number): void {
        if (cost) {
            this.shippingCost = cost;
        }
    }
}
