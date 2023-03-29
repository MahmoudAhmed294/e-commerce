import { Component, Input } from '@angular/core';
import { ICart } from 'src/app/model/product';

@Component({
    selector: 'app-order-products',
    templateUrl: './order-products.component.html',
    styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent {
    @Input() product: ICart | undefined;

}
