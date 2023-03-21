import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    cartSize: number | null = null;

    user: IUser | null = null;

    constructor(public accountService: AccountService, private cartService: CartService) {
        this.accountService.currentUser$.subscribe({
            next: (user) => {
                this.user = user;
            },
            error: () => (this.user = null)
        });
    }
    ngOnInit(): void {
        this.cartService.getCountSize();
        this.getCartSize();
    }

    getCartSize() {
        this.cartService.currentSize$.subscribe({
            next: (res) => {
                this.cartSize = res;
            }
        });
    }

    logout() {
        this.accountService.logout();
    }
}
