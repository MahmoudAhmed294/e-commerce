import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICart } from 'src/app/model/product';
import { ProductParams } from 'src/app/model/productParams';
import { CartService } from 'src/app/service/cart.service';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    @Input() product: ICart | undefined;
    @Output() deleteProductCart = new EventEmitter<number>();

    quantity: number = 1;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        if (this.product) {
            this.quantity = this.product.quantity;
        }
    }

    plusCounter() {
        if (this.product) {
            this.quantity++;
            this.cartService.updateCount(this.quantity, this.product.id);
        }
    }

    plusMinus() {
        if (this.quantity > 1) {
            if (this.product) {
                this.quantity--;
                this.cartService.updateCount(this.quantity, this.product.id);
            }
        }
    }

    removeProductCart(id: number) {
        this.deleteProductCart.emit(id);
    }
}
