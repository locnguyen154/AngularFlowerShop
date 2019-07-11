import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlowersService} from '../service/flowers.service';
import {FlowerModel} from '../models/FlowerModel';
import {MatDialog} from '@angular/material';
import {FlowerAddComponent} from '../flower-add/flower-add.component';
import {CartService} from '../service/cart.service';

@Component({
    selector: 'app-flower-detail',
    templateUrl: './flower-detail.component.html',
    styleUrls: ['./flower-detail.component.scss']
})
export class FlowerDetailComponent implements OnInit {
    flower: FlowerModel;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private flowersService: FlowersService,
        private matDialog: MatDialog,
        private cartService: CartService,
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.flower = this.flowersService.getFlowerById(+params.get('flowerId'));
        });
        this.checkSession();
        this.checkFlower();
    }

    checkFlower() {
        if (this.flower.remainingStock > 0) {
            this.flower.quantity = 1;
            this.flower.totalMoney = this.flower.price;
        } else {
            this.flower.quantity = 0;
            this.flower.totalMoney = 0;
        }
    }

    checkSession() {
        if (sessionStorage.getItem('session')) {
            document.getElementById('btn-remove-flower').setAttribute('type', 'button');
            document.getElementById('btn-edit-flower').setAttribute('type', 'button');
        }
    }

    openDialogEditFlower(flowerId) {
        this.matDialog.open(FlowerAddComponent, {
            data: {
                ['flowerId']: flowerId,
            }
        });
    }

    removeFlower(flowerId) {
        this.flowersService.removeFlower(flowerId);
        this.flowersService.saveChange();
        this.router.navigate(['']);
        const snackbar = document.getElementById('snackbar');
        // Add the "show" class to DIV
        snackbar.className = 'show';
        // @ts-ignore
        snackbar.value = 'Your flower has been removed!';
        // After 3 seconds, remove the show class from DIV
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
    }

    changeQuantityFromButton(step) {
        if (this.flower.quantity <= 1 && step < 0 && this.flower.remainingStock > 0) {
            this.flower.quantity = 1;
        } else if (this.flower.quantity >= this.flower.remainingStock && step > 0) {
            this.flower.quantity = this.flower.remainingStock;
        } else if (this.flower.quantity > 0 && this.flower.quantity <= this.flower.remainingStock) {
            this.flower.quantity += step;
        }
        this.flower.totalMoney = this.flower.price * this.flower.quantity;
    }

    changeQuantityFromInput() {
        this.flower.totalMoney = this.flower.price * this.flower.quantity;
    }

    onChangeQuantity() {
        if (this.flower.quantity < 1) {
            this.flower.quantity = 1;
            this.flower.totalMoney = this.flower.price;
        } else if (this.flower.quantity > this.flower.remainingStock) {
            this.flower.quantity = this.flower.remainingStock;
            this.flower.totalMoney = this.flower.price * this.flower.quantity;
        } else {
            this.flower.totalMoney = this.flower.price * this.flower.quantity;
        }
    }

    formatNumber(numbers) {
        // format number 1000000 to 1,234,567
        return numbers.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    addToCart(flower: FlowerModel) {
        this.cartService.addToCart(flower);
        this.cartService.saveChange();
        const snackbar = document.getElementById('snackbar');
        // Add the "show" class to DIV
        snackbar.className = 'show';
        // @ts-ignore
        snackbar.value = 'Your flower has been added to cart!';
        // After 3 seconds, remove the show class from DIV
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
    }
}
