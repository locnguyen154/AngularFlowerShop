import { Injectable } from '@angular/core';
import {OrderInfoModel} from '../models/OrderInfoModel';
import {FlowerModel} from "../models/FlowerModel";
import {CartService} from "./cart.service";
import {FlowersService} from "./flowers.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    cartFlowers: FlowerModel[];
    flowers: FlowerModel[];

    constructor(
        private cartService: CartService,
        private flowerService: FlowersService,
    ) {
        this.cartFlowers = this.cartService.getItems();
        this.flowers = this.flowerService.getFlowers();
    }

    submitOrder(orderInfo: OrderInfoModel) {
        this.decreaseQuantityInStock();
        localStorage.setItem('order', JSON.stringify(orderInfo));
        localStorage.removeItem('flowersCart');
    }

    decreaseQuantityInStock() {
        for (const cartFlower of this.cartFlowers) {
            const flower = this.flowerService.getFlower(cartFlower.id);
            flower.remainingStock -= cartFlower.quantity;
            this.flowerService.editFlower(flower);
            this.flowerService.saveChange();
        }
    }
}
