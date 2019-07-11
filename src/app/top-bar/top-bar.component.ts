import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.checkSession();
    }

    checkSession() {
        if (sessionStorage.getItem('session')) {
            document.getElementById('btn-login').setAttribute('value', 'Hi ' + sessionStorage.getItem('session'));
            document.getElementById('btn-login').setAttribute('disabled', 'true');
            document.getElementById('btn-logout').setAttribute('type', 'button');
        }
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = '350px';
        dialogConfig.width = '350px';
        this.dialog.open(LoginComponent, dialogConfig);
    }

    logout() {
        sessionStorage.removeItem('session');
        location.reload();
    }
}
