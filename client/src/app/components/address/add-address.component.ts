import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html',
    styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
    addressForm: FormGroup = new FormGroup({});
    validationErrors: string[] | undefined;

    constructor(
        public addressService: AddressService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.addressForm = this.fb.group({
            userAddress: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.maxLength(11)]],
            country: ['', [Validators.required]],
            city: ['', [Validators.required]]
        });
    }

    addAddress() {

        if (this.addressForm.value) {
            this.addressService.addAddress(this.addressForm.value).subscribe({
                next: (_) => this.router.navigateByUrl('/make-order')
            });
        }
    }
}
