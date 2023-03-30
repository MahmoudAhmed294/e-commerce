import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
    selector: 'app-all-orders',
    templateUrl: './all-orders.component.html',
    styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
    orders: IOrder[] | null = null;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe({
            next: (res: IOrder[]) => {
                if (res) {
                    this.orders = res;
                }
            }
        });
    }
    cancelOrder(id:number){}
}
