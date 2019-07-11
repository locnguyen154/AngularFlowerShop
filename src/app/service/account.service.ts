import {Injectable} from '@angular/core';
import {AccountModel} from '../models/AccountModel';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    accounts: AccountModel[];

    constructor() {
        this.onInit();
    }

    onInit() {
        if (localStorage.getItem('accounts')) {
            this.accounts = JSON.parse(localStorage.getItem('accounts'));
        } else {
            this.accounts = [];
        }
    }

    addAccount(account: AccountModel) {
        this.accounts.push(account);
    }

    getAccounts(): AccountModel[] {
        return this.accounts;
    }

    getAccount(userName) {
        return this.accounts.find(s => s.userName === userName);
    }

    isValid(account: AccountModel) {
        return this.accounts.find(s => s.userName === account.userName && s.passWord === account.passWord);
    }

    saveChange() {
        localStorage.removeItem('accounts');
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
}
