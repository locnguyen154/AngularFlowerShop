import {Component, OnInit} from '@angular/core';
import {FlowersService} from '../service/flowers.service';
import {CartService} from '../service/cart.service';
import {MatDialog} from '@angular/material';
import {FlowerAddComponent} from '../flower-add/flower-add.component';

@Component({
    selector: 'app-flowers-list',
    templateUrl: './flowers-list.component.html',
    styleUrls: ['./flowers-list.component.scss']
})
export class FlowersListComponent implements OnInit {
    flowers = this.flowersService.getFlowers();

    constructor(
        private cartService: CartService,
        private flowersService: FlowersService,
        private matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this.checkSession();
    }

    openDialogAddFlower() {
        this.matDialog.open(FlowerAddComponent, {
            data: {['flowerId']: null},
        });
    }

    checkSession() {
        if (sessionStorage.getItem('session')) {
            document.getElementById('btn-add-flower').setAttribute('type', 'button');
        }
    }
}
