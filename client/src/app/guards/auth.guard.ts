import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private accountService:AccountService, private toastr: ToastrService ,private router:Router ) {}

    canActivate(
      
    ): Observable<boolean> {
        return this.accountService.currentUser$.pipe(
          map(user =>{
            if(user) return true;
            else{
              this.toastr.warning("You need to login!");
              this.router.navigateByUrl('/login')
              return false
            }
          })
        )
    }
}
