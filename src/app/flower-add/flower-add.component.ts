import {Component, Inject, OnInit} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {FlowersService} from '../service/flowers.service';
import {FlowerModel} from '../models/FlowerModel';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-flower-add',
    templateUrl: './flower-add.component.html',
    styleUrls: ['./flower-add.component.scss']
})
export class FlowerAddComponent implements OnInit {
    addFlowerForm;
    flowers: FlowerModel[];
    flower: FlowerModel;
    isAdding: boolean;

    constructor(
        private flowersService: FlowersService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<FlowerAddComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
    }

    ngOnInit() {
        if (this.data.flowerId) {
            this.flower = this.flowersService.getFlowerById(this.data.flowerId);
            document.getElementById('btn-edit').setAttribute('type', 'submit');
            this.isAdding = false;
            this.addFlowerForm = this.formBuilder.group( {
                name: [this.flower.name, Validators.required],
                price: [this.flower.price, Validators.required],
                imageLink: [this.flower.imageLink, Validators.required],
                remainingStock: [this.flower.remainingStock, Validators.required],
            });
        } else {
            document.getElementById('btn-add').setAttribute('type', 'submit');
            this.isAdding = true;
            this.addFlowerForm = this.formBuilder.group( {
                name: [null, Validators.required],
                price: [null, Validators.required],
                imageLink: [null, Validators.required],
                remainingStock: [null, Validators.required],
            });
        }
    }

    onSubmit(flower: FlowerModel) {
        if (this.isAdding === true) {
            this.addFlower(flower);
        } else {
            this.editFlower(flower);
        }
        this.dialogRef.close();
    }

    addFlower(flower: FlowerModel) {
        this.flowers = this.flowersService.getFlowers();
        if (this.flowers.length === 0) {
            flower.id = 1;
        } else {
            flower.id = +this.flowers[this.flowers.length - 1].id + 1;
        }
        flower.price = +(flower.price.toString().replace(',',''));
        flower.remainingStock = +(flower.remainingStock.toString().replace(',',''));
        flower.quantity = 0;
        flower.totalMoney = 0;
        this.flowersService.addFlower(flower);
        this.flowersService.saveChange();
        const snackbar = document.getElementById('snackbar');
        // Add the "show" class to DIV
        snackbar.className = 'show';
        // @ts-ignore
        snackbar.value = 'Add a flower successfully!';
        // After 3 seconds, remove the show class from DIV
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
        this.addFlowerForm.reset();
    }

    editFlower(flower: FlowerModel) {
        flower.id = this.flower.id;
        flower.quantity = 0;
        flower.totalMoney = 0;
        flower.price = +(flower.price.toString().replace(',',''));
        flower.remainingStock = +(flower.remainingStock.toString().replace(',',''));
        this.flowersService.editFlower(flower);
        this.flowersService.saveChange();
        const snackbar = document.getElementById('snackbar');
        // Add the "show" class to DIV
        snackbar.className = 'show';
        // @ts-ignore
        snackbar.value = 'Edit a flower successfully!';
        // After 3 seconds, remove the show class from DIV
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
    }

    formatNumber(id) {
        // format number 1000000 to 1,234,567
        // @ts-ignore
        document.getElementById(id).value = document.getElementById(id).value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
