import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-restaurants',
    pathMatch: 'full'
  },
  {
    path: 'manage-restaurants',
    loadChildren: () => import('./components/manage-restaurants/manage-restaurant.module').then(m => m.ManageRestaurantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
