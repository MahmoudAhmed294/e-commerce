import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts, IProductsDetails } from 'src/app/model/product';
import { ProductsService } from 'src/app/service/products.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product: IProductsDetails | undefined;
    max = 5;
    rate:number = 0;
    isReadonly = true;
  
    constructor(private productsService: ProductsService, private route: ActivatedRoute ,
        private router: Router

        ) {}

    ngOnInit(): void {
        this.loadMember();
    }

    private loadMember() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                this.product = product;
                this.rate = product.rating;
            },
            error:()=>this.router.navigateByUrl("error")
        });
    }
}
