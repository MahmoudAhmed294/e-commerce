import { Component, DoCheck, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck, OnInit {
    cartSize: number | null = null;

    user: IUser | null = null;

    constructor(public accountService: AccountService, private cartService: CartService) {}

    ngOnInit(): void {
        this.accountService.currentUser$.subscribe({
            next: (user) => {
                if (user) {
                    this.user = user;
                    this.cartSize = this.user?.cartCount;
                }
            },
            error: () => (this.user = null)
        });
    }

    ngDoCheck() {
        if (this.user && this.cartSize !== null) {
            this.getCartSize();
        }
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
