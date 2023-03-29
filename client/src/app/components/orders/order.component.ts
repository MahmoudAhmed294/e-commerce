import { Component } from '@angular/core';
import { IAddress } from 'src/app/model/Address';
import { ICart } from 'src/app/model/product';
import { IUser } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent {
    orderProduct: ICart[] | null = null;
    shippingCost: number = 0;
    total: number = 0;
    user: IUser | undefined;
    currentDate = new Date();
    mainAddress: IAddress | null = null;
    orderId: string = Math.random().toString(36).slice(-8);

    constructor(
        private orderService: OrderService,
        private accountService: AccountService,
        private addressService: AddressService,
        private cartService: CartService
    ) {
        this.addressService.getMainAddress().subscribe({
            next: (res: any) => (this.mainAddress = res)
        });
    }

    ngOnInit(): void {
        if (this.orderService.orderProduct) {
            this.orderProduct = this.orderService.orderProduct;
            this.shippingCost = this.orderService.shippingCost;
            this.total = this.orderService.total;
            this.accountService.currentUser$.subscribe({
                next: (res) => {
                    if (!res) return;
                    this.user = res;
                }
            });
        }
    }
    makeOrder() {
        if (this.mainAddress) {
            this.orderService.makeOrder({
                addressId: this.mainAddress?.id,
                paymentMethod: 'Cash'
            });
        }
        this.cartService.getCountSize();
    }
}
