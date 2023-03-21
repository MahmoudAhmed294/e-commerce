import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { IProducts, IProductsDetails } from 'src/app/model/product';
import { IUser } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product: IProductsDetails | undefined;
    max = 5;
    rate: number = 0;
    isReadonly = true;
    galleryOption: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,

    ) {}

    ngOnInit(): void {
        this.loadMember();
        this.galleryOption = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false
            }
        ];
    }
    getImages() {
        if (!this.product) return [];
        const imageUrls = [];
        for (const photo of this.product.images) {
            imageUrls.push({
                small: photo.url,
                medium: photo.url,
                big: photo.url
            });
        }
        return imageUrls;
    }

    private loadMember() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                this.product = product;
                this.rate = Math.round(product.rating);
                this.galleryImages = this.getImages();
            },
            error: () => this.router.navigateByUrl('error')
        });
    }

    addToCart(id: number) {
        this.cartService.addToCart(id)
    }
}
