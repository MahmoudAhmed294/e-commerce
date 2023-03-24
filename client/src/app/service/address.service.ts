import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress, ISetAddress } from '../model/Address';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    address: IAddress[] | null = null;
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    getAddresses() {
        this.http.get<IAddress[]>(`${this.baseUrl}Address/all`).subscribe({
  
            next: (responsive) => {
                this.address = responsive;
                if (responsive) {
                    this.router.navigateByUrl('make-order');
                } else {
                    this.router.navigateByUrl('add-address');
                }
            }
        });
    }

    addAddress(address: ISetAddress) {
        return this.http.post(`${this.baseUrl}Address`, address).pipe(
            map((res) => {
                return res;
            })
        );
    }

    getAddress(id: number) {}

    updateAddress(id: number) {}

    deleteAddress(id: number) {}

    changeMainAddress(id: number) {}
}
