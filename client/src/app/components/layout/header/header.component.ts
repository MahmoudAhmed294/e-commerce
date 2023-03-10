import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public accountService: AccountService,
    private router: Router,
) {
  console.log(accountService.currentUser$);
  
}
logout(){
  this.accountService.logout()
}

}
