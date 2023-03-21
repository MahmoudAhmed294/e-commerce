import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/model/pagination';
import { ICart } from 'src/app/model/product';
import { ProductParams } from 'src/app/model/productParams';
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

    constructor(private cartService: CartService, private paginationService: PaginationService) {
        this.productParams = this.paginationService.getProductParams();
    }

    ngOnInit() {
        this.getCartItems();
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
}
