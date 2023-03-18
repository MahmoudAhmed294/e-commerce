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

    constructor(
        private cartService: CartService,
        private toastr: ToastrService,
        private accountService: AccountService,
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
            this.cartService.addToCart(id).subscribe({
                next: () => this.toastr.success('product has added to cart')
            });
            this.cartService.getCountSize();
        } else {
            this.toastr.warning('You need to login');
            this.router.navigateByUrl('/login');
        }
    }
}
