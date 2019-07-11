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

    getFlowerById(flowerId): FlowerModel {
        return this.flowers.find(s => s.id === flowerId);
    }

    getFlowers(): FlowerModel[] {
        return this.flowers;
    }

    addFlower(flower) {
        this.flowers.push(flower);
    }

    editFlower(flower) {
        // this.removeFlower(flower.id);
        // this.addFlower(flower);
        const index = this.getIndexById(flower.id);
        this.flowers.splice(index, 0, flower);
        this.flowers.splice(index + 1, 1);
    }

    getIndexById(flowerId) {
        return this.flowers.indexOf(this.getFlowerById(flowerId));
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
