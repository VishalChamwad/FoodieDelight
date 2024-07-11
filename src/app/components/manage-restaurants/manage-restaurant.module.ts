import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ManageRestaurantRoutingModule } from "./manage-restaurant-routing.module";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BrowserModule } from "@angular/platform-browser";
import { RestaurantsListComponent } from "./restaurant-list/restaurants-list.component";
import { DialogModule } from 'primeng/dialog';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        RestaurantsListComponent,
        AddRestaurantComponent
    ],
    imports: [
        ManageRestaurantRoutingModule,
        ButtonModule,
        TableModule,
        DialogModule,
        ReactiveFormsModule,
        CommonModule,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [],
})

export class ManageRestaurantModule { }
