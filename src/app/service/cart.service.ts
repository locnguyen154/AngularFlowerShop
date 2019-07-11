import {Injectable} from '@angular/core';
import {FlowerModel} from '../models/FlowerModel';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items: FlowerModel[];

    constructor() {
        this.onInit();
    }

    onInit() {
        if (localStorage.getItem('flowersCart')) {
            this.items = JSON.parse(localStorage.getItem('flowersCart'));
        } else {
            this.items = [];
        }
    }

    addToCart(item) {
        const flower = Object.assign({}, item);
        if (this.items.length === 0) {
            this.items.push(flower);
        } else {
            for (let i = 0; i < this.items.length; i++) {
                if (item.id === this.items[i].id) {
                    this.items[i].quantity += item.quantity;
                    this.items[i].totalMoney += item.totalMoney;
                    break;
                }
                if (i === this.items.length - 1) {
                    this.items.push(flower);
                    break;
                }
            }
        }
    }

    getItems() {
        return this.items;
    }

    getItemByIndex(index) {
        return this.items[index];
    }

    clearItems() {
        this.items = [];
        return this.items;
    }

    removeItem(index, removeTotal) {
        if (this.items[index].quantity === removeTotal) {
            this.items.splice(index, 1);
        } else {
            this.items[index].quantity -= removeTotal;
        }
    }

    saveChange() {
        localStorage.removeItem('flowersCart');
        localStorage.setItem('flowersCart', JSON.stringify(this.items));
    }
}
