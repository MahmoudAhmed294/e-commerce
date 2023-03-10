import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, IRegister, IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private cookieService: CookieService ,private http: HttpClient) { }

login(model:ILogin){
return this.http.post<IUser>(`${this.baseUrl}Account/login` ,model).pipe(
  map((response:IUser)=>{
    const user = response;
    if(user) this.setCurrentUser(user);
  })
)
}
register(model:IRegister){
return this.http.post<IUser>(`${this.baseUrl}Account/register` ,model).pipe(
  map((response:IUser)=>{
    const user = response;
    if(user) this.setCurrentUser(user);
  })
)
}

setCurrentUser(user: IUser) {
  this.cookieService.set('user',JSON.stringify(user))
  this.currentUserSource.next(user);
}
logout() {
  this.cookieService.delete('user');

  this.currentUserSource.next(null);
}


}
