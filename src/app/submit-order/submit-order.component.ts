import { Component, OnInit } from '@angular/core';
import {OrderInfoModel} from '../models/OrderInfoModel';
import {CartService} from "../service/cart.service";
import {OrderService} from "../service/order.service";
import {MatDialogRef} from "@angular/material";
import {HelperService} from "../service/helper.service";

@Component({
    selector: 'app-submit-order',
    templateUrl: './submit-order.component.html',
    styleUrls: ['./submit-order.component.scss']
})
export class SubmitOrderComponent implements OnInit {
    orderInfo: OrderInfoModel;

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private matDialogRef: MatDialogRef<SubmitOrderComponent>,
    ) { }

    ngOnInit() {
        this.orderInfo = {
            name: '',
            phoneNumber: '',
            flower: this.cartService.getItems(),
            totalMoney: this.cartService.getTotalMoney()
        };
    }

    onSubmitOrder() {
        this.orderService.submitOrder(this.orderInfo);
        this.matDialogRef.close();
        window.location.reload();
        HelperService.toastMakeText('Your order has been submitted!');
    }
}
