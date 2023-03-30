import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared.module';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProductComponent } from './components/product/product-item/product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CartComponent } from './components/cart/cart-item/cart.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { OrderComponent } from './components/orders/order.component';
import { OrderProductsComponent } from './components/orders/order-products/order-products.component';
import { AllAddressComponent } from './components/address/all-address/all-address.component';
import { AddressDetailsComponent } from './components/address/address-details/address-details.component';
import { EditAddressComponent } from './components/address/edit-address/edit-address.component';
import { AddressItemsComponent } from './components/address/address-items/address-items.component';
import { AllOrdersComponent } from './components/orders/all-orders/all-orders.component';
import { OrderItemComponent } from './components/orders/order-item/order-item.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        TextInputComponent,
        NotFoundComponent,
        ServerErrorComponent,
        HeaderComponent,
        FooterComponent,
        ProductComponent,
        ProductListComponent,
        CartComponent,
        CartListComponent,
        ProductDetailsComponent,
        AddAddressComponent,
        OrderComponent,
        OrderProductsComponent,
        AllAddressComponent,
        AddressDetailsComponent,
        EditAddressComponent,
        AddressItemsComponent,
        AllOrdersComponent,
        OrderItemComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
