import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICart } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    @Input() product: ICart | undefined;
    @Output() deleteProductCart = new EventEmitter<number>();

    constructor(private cartService: CartService) {}

    ngOnInit(): void {}

    plusCounter() {
        if (this.product) {
            this.product.quantity++;
            this.cartService.updateCount(this.product.quantity, this.product.id);
        }
    }

    plusMinus() {
        if (this.product) {
            if (this.product.quantity > 1) {
                this.product.quantity--;
                this.cartService.updateCount(this.product.quantity, this.product.id);
            }
        }
    }

    removeProductCart(id: number) {
        this.deleteProductCart.emit(id);
    }
}
