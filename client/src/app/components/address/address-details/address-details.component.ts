import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/model/Address';

@Component({
    selector: 'app-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
    @Input() address: IAddress | undefined;
    constructor() {}
    
    ngOnInit(): void {}
}
