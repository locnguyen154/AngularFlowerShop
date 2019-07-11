import { Injectable } from '@angular/core';
import {OrderInfoModel} from '../models/OrderInfoModel';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor() {}

    submitOrder(orderInfo: OrderInfoModel) {
        localStorage.setItem('order', JSON.stringify(orderInfo));
        localStorage.removeItem('flowersCart');
    }
}
