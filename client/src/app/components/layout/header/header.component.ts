import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    cartSize: string | null = null;

    constructor(public accountService: AccountService, private cartService: CartService) {}
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
