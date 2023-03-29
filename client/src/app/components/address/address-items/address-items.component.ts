import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from 'src/app/model/Address';

@Component({
    selector: 'app-address-items',
    templateUrl: './address-items.component.html',
    styleUrls: ['./address-items.component.css']
})
export class AddressItemsComponent {
    @Input() address: IAddress | undefined;
    @Output() deleteAddress = new EventEmitter<number>();
    @Output() changeToMain = new EventEmitter<number>();

    constructor(private router: Router) {}

    deleteAddressFromList(id: number) {
        this.deleteAddress.emit(id);
    }

    changeToMainInList(id: number) {
        this.changeToMain.emit(id);
    }

    editAddress(id: number) {
        this.router.navigateByUrl(`edit-address/${id}`);
    }
}
