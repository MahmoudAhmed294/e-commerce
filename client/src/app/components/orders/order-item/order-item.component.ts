import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/model/order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  @Input() orders: IOrder | undefined;
  @Output() cancelOrder = new EventEmitter<number>();

  constructor(private router: Router) {}

  deleteAddressFromList(id: number) {
      this.cancelOrder.emit(id);
  }


  orderDetails(id: number) {
      this.router.navigateByUrl(`order-details/${id}`);
  }

}
