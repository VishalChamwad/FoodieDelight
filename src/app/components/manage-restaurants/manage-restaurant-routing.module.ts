import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurant-list/restaurants-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'restaurant-list',
        pathMatch: 'full'
    },
    {
        path: 'restaurant-list',
        component: RestaurantsListComponent,
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRestaurantRoutingModule { }
