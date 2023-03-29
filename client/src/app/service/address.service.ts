import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress, ISetAddress } from '../model/Address';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    address: IAddress[] | null = null;
    baseUrl: string = environment.apiUrl;
    mainAddress: IAddress | null = null;

    constructor(private http: HttpClient) {}

    getAddresses() {
        return this.http.get<IAddress[]>(`${this.baseUrl}Address/all`);
    }

    addAddress(address: ISetAddress) {
        return this.http.post(`${this.baseUrl}Address`, address).pipe(
            map((res) => {
                return res;
            })
        );
    }

    getMainAddress() {
        return this.http.get(`${this.baseUrl}Address`).pipe(
            map((res) => {
                if (!res) return;
                return res;
            })
        );
    }

    deleteAddress(id: number) {
        return this.http.delete(`${this.baseUrl}Address/${id}`, {});
    }

    changeMainAddress(id: number) {
        return this.http.put(`${this.baseUrl}Address/set-main-address/${id}`, {});
    }

    getAddress(id: number) {
        return this.http.get<IAddress>(`${this.baseUrl}Address/${id}`);
    }

    updateAddress(address: IAddress) {
        return this.http.put(`${this.baseUrl}Address/${address.id}`, address);
    }
}
