import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { OrderComponent } from './components/orders/order.component';
import { AllAddressComponent } from './components/address/all-address/all-address.component';
import { EditAddressComponent } from './components/address/edit-address/edit-address.component';
import { AllOrdersComponent } from './components/orders/all-orders/all-orders.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'cart',
                component: CartListComponent
            },
            {
                path: 'add-address',
                component: AddAddressComponent
            },
            {
                path: 'make-order',
                component: OrderComponent
            },
            {
                path: 'orders',
                component: AllOrdersComponent
            },
            {
                path: 'address',
                component: AllAddressComponent
            },
            {
                path: 'edit-address/:id',
                component: EditAddressComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'error',
        component: NotFoundComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full'
    },
    {
        path: 'server-error',
        component: ServerErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
