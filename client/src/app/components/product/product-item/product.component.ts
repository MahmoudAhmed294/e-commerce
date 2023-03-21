import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IProducts } from 'src/app/model/product';
import { IUser } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {
    @Input() product: IProducts | undefined;
    private user: IUser | null = null;

    constructor(private cartService: CartService) {}

    addToCart(id: number) {
        this.cartService.addToCart(id);
    }
}
