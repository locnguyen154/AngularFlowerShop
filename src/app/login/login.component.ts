import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AccountModel} from '../models/AccountModel';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../service/account.service';
import {HelperService} from '../service/helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm;

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: [null, Validators.required],
            passWord: [null, Validators.required],
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    login(account: AccountModel) {
        if (this.accountService.isValid(account)) {
            this.loginSuccessfully(account);
        } else {
            this.loginFail();
        }
        this.dialogRef.close();
    }

    loginSuccessfully(account: AccountModel) {
        sessionStorage.setItem('session', account.userName);
        document.getElementById('btn-login').setAttribute('value', sessionStorage.getItem('session'));
        document.getElementById('btn-login').setAttribute('disabled', 'true');
        document.getElementById('btn-add-flower').setAttribute('type', 'button');
        document.getElementById('btn-logout').setAttribute('type', 'button');
        HelperService.toastMakeText('Log in successfully!');
    }

    loginFail() {
        HelperService.toastMakeText('Account invalid!');
    }
}
