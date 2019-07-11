import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {FlowerModel} from '../models/FlowerModel';
import {MatDialog} from "@angular/material";
import {OrderInfoModel} from "../models/OrderInfoModel";
import {SubmitOrderComponent} from "../submit-order/submit-order.component";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    flowers: FlowerModel[];

    constructor(
        private cartService: CartService,
        private matDialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.flowers = this.cartService.getItems();
    }

    removeItem(index) {
        const removeQuantity = +document.getElementById('remove-total-' + index).getAttribute('value');
        if (removeQuantity < 1 || removeQuantity > this.cartService.getItemByIndex(index).quantity) {
            alert('Remove total must be more than 0 and less than ' + (this.cartService.getItemByIndex(index).quantity + 1));
        } else {
            this.cartService.removeItem(index, removeQuantity);
            this.cartService.saveChange();
        }
    }

    openDialogSubmitOrder() {
        this.matDialog.open(SubmitOrderComponent);
    }
}
