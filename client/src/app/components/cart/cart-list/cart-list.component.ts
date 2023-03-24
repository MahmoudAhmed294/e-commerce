import { Component, DoCheck, OnInit } from '@angular/core';
import { IPagination } from 'src/app/model/pagination';
import { ICart } from 'src/app/model/product';
import { ProductParams } from 'src/app/model/productParams';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
    products: ICart[] | null = null;
    pagination: IPagination | undefined;
    productParams: ProductParams | undefined;
    shippingCost: number = 0;
    total: number = 0;

    constructor(
        private cartService: CartService,
        private paginationService: PaginationService,
        private addressService: AddressService
    ) {
        this.productParams = this.paginationService.getProductParams();
    }

    ngOnInit() {
        this.getCartItems();
    }

    onQuantityChange() {
        if (this.products) {
            this.shippingCost = this.products?.length * 100;
            this.total = this.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
            return this.total;
        }
        return null;
    }

    removeDeletedProduct(id: number) {
        if (this.productParams) {
            this.cartService.deleteCartProduct(id, this.productParams);
            this.products = this.products
                ? this.products.filter((value) => value.id !== id)
                : this.products;
        }
    }

    getCartItems() {
        if (this.productParams) {
            this.paginationService.setProductParams(this.productParams);
            this.cartService.getCartsProduct(this.productParams).subscribe({
                next: (response) => {
                    if (response) {
                        this.products = this.cartService.cartProducts;

                        this.pagination = response.pagination;
                    }
                }
            });
        }
    }

    pageChanged(event: any) {
        if (this.productParams && this.productParams?.pageNumber !== event.page) {
            this.productParams.pageNumber = event.page;
            this.paginationService.setProductParams(this.productParams);
            this.getCartItems();
        }
    }

    checkAddress() {
        
        this.addressService.getAddresses();
        
    }
}
