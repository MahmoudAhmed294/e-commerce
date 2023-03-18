import { Component, Input } from '@angular/core';
import { IProducts } from 'src/app/model/product';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    @Input() product: IProducts | undefined;
    quantity: number = 1;
    plusCounter() {
        this.quantity++;
    }
    plusMinus() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
