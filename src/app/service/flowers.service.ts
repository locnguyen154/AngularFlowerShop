import {Injectable} from '@angular/core';
import {FlowerModel} from '../models/FlowerModel';

@Injectable({
    providedIn: 'root'
})
export class FlowersService {
    flowers;

    constructor() {
        this.onInit();
    }

    onInit() {
        if (localStorage.getItem('flowers')) {
            this.flowers = JSON.parse(localStorage.getItem('flowers'));
        } else {
            this.flowers = [];
        }
    }

    getFlower(flowerId): FlowerModel {
        return this.flowers.find(s => s.id === flowerId);
    }

    getFlowers(): FlowerModel[] {
        return this.flowers;
    }

    addFlower(flower) {
        this.flowers.push(flower);
    }

    editFlower(flower) {
        const index = this.getIndex(flower.id);
        this.flowers.splice(index, 0, flower);
        this.flowers.splice(index + 1, 1);
    }

    getIndex(flowerId) {
        return this.flowers.indexOf(this.getFlower(flowerId));
    }

    removeFlower(flowerId) {
        for (const flower of this.flowers) {
            if (flower.id === flowerId) {
                this.flowers.splice(this.flowers.indexOf(flower), 1);
                break;
            }
        }
    }

    saveChange() {
        localStorage.removeItem('flowers');
        localStorage.setItem('flowers', JSON.stringify(this.flowers));
    }
}
