import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './service/account.service';
import { IUser } from './model/user';
import { CartService } from './service/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private cookieService: CookieService,
        private accountService: AccountService,
        private cartService: CartService
    ) {}
    ngOnInit(): void {
        this.setCurrentUser();
    }
    setCurrentUser() {
        const userString = this.cookieService.get('user');

        if (!userString) return;

        const user: IUser = JSON.parse(userString);
        
        this.accountService.setCurrentUser(user);
        
        this.cartService.getCountSize();
    }
}
