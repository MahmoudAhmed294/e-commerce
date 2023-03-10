import { Component } from '@angular/core';
import { IPagination } from 'src/app/model/pagination';
import { IProducts } from 'src/app/model/product';
import { ProductParams } from 'src/app/model/productParams';
import { PaginationService } from 'src/app/service/pagination.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: IProducts[] = [];
  pagination: IPagination | undefined;
  productParams: ProductParams | undefined;

  ngOnInit() {
      this.loadProduct();
  }

  constructor(
      private productsService: ProductsService,
      private paginationService: PaginationService
  ) {
      this.productParams = this.paginationService.getProductParams();
  }

  loadProduct() {
      if (this.productParams) {
          this.paginationService.setProductParams(this.productParams);
          this.productsService.getProducts(this.productParams).subscribe({
              next: (response) => {
                  if (response.result && response.pagination) {
                      this.products = response.result;
                      this.pagination = response.pagination;
                  }
              }
          });
      }
  }
  pageChanged(event: any) {
      if (this.productParams && this.productParams?.pageNumber !== event.page) {
          this.productParams.pageNumber = event.page;
          this.paginationService.setProductParams(this.productParams);
          this.loadProduct();
      }
  }

}
