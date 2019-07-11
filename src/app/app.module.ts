import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FlowersListComponent } from './flowers-list/flowers-list.component';
import { FlowerDetailComponent } from './flower-detail/flower-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { FlowerAddComponent } from './flower-add/flower-add.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SubmitOrderComponent } from './submit-order/submit-order.component';

@NgModule({
    declarations: [
        AppComponent,
        FlowersListComponent,
        TopBarComponent,
        FlowerDetailComponent,
        CartComponent,
        FlowerAddComponent,
        LoginComponent,
        SubmitOrderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        RouterModule.forRoot([
            {path: '', component: FlowersListComponent},
            {path: 'flowers/:flowerId', component: FlowerDetailComponent},
            {path: 'cart', component: CartComponent},
            {path: 'add-flower', component: FlowerAddComponent},
            {path: 'edit-flower/:flowerId', component: FlowerAddComponent},
            {path: 'login', component: LoginComponent},
            {path: 'order', component: SubmitOrderComponent}
        ]),
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
