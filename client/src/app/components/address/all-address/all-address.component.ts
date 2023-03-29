import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/model/Address';
import { AddressService } from 'src/app/service/address.service';

@Component({
    selector: 'app-all-address',
    templateUrl: './all-address.component.html',
    styleUrls: ['./all-address.component.css']
})
export class AllAddressComponent implements OnInit {
    addresses: IAddress[] | null = null;
    constructor(private addressService: AddressService, private toastr: ToastrService) {}
    ngOnInit(): void {
        this.addressService.getAddresses().subscribe({
            next: (responsive) => (this.addresses = responsive),
            error: (_) => (this.addresses = null)
        });
    }

    deleteAddress(id: number) {
        this.addressService.deleteAddress(id).subscribe({
            next: () => {
                if (this.addresses) {
                    this.addresses = this.addresses?.filter((value) => value.id !== id);
                }

                this.toastr.success('Address deleted succeed');
            },

            error: () => this.toastr.error("can't delete the address")
        });
    }

    changeToMain(id: number) {
        this.addressService.changeMainAddress(id).subscribe({
            next: () => {
                if (this.addresses) {
                    this.addresses = this.addresses.map((value) =>
                        value.id === id ? { ...value, isMain: true } : { ...value, isMain: false }
                    );
                }

                this.toastr.success('change main address has done success');
            },

            error: () => this.toastr.error('change main address has failed')
        });
    }
}
