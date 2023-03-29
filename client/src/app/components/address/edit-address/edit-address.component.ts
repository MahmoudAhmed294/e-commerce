import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
    addressForm: FormGroup = new FormGroup({});
    validationErrors: string[] | undefined;
    addressId:number | undefined;
    constructor(
        public addressService: AddressService,
        private fb: FormBuilder,
        private location: Location,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.router.params.subscribe((params) => {
            this.getEditingAddress(+params['id']);
        });
    }
    getEditingAddress(id: number) {
        this.addressService.getAddress(id).subscribe({
          next:(res)=>{this.addressForm.setValue({
            userAddress:res.userAddress,
            phone:res.phone,
            country:res.country,
            city:res.city,
          })
        this.addressId =res.id
        }
        })
    }

    initializeForm() {
        this.addressForm = this.fb.group({
            userAddress: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.maxLength(11)]],
            country: ['', [Validators.required]],
            city: ['', [Validators.required]]
        });
    }

    updateAddress() {
        if (this.addressForm.value && this.addressId) {
            this.addressService.updateAddress({id:this.addressId,...this.addressForm.value}).subscribe({
                next: (_) => this.location.back()
            });
        }
    }
}
