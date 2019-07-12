import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() {
    }

    static toastMakeText(text) {
        const snackbar = document.getElementById('snackbar');
        snackbar.className = 'show';
        // @ts-ignore
        snackbar.value = text;
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
    }
}
