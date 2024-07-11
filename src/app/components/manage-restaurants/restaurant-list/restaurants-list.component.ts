import { RestApiService } from './../../../services/restApi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  @ViewChild('addRestaurantForm') addRestaurantForm!: AddRestaurantComponent;
  addRestaurantPopup: boolean = false;
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | undefined;
  totalRecord: number = 0;

  constructor(
    private storageService: StorageService,
    private messageService: MessageService,
    private restApiService: RestApiService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restApiService.getAllRestaurants().subscribe(result => {
      // this.restaurants = result;
      this.restaurants = result.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      this.totalRecord = this.restaurants.length;
      this.addRestaurantPopup = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fetching Restaurant List Failed' });
    })
  }

  addRestaurant() {
    this.clearForm();
    this.addRestaurantPopup = true;
    this.selectedRestaurant = undefined;
  }

  saveRestaurant() {
    let data = {
      id: uuidv4(),
      createdAt: Date.now(),
      name: this.addRestaurantForm.restaurantForm.controls.name.value,
      phoneNumber: this.addRestaurantForm.restaurantForm.controls.phoneNumber.value,
      email: this.addRestaurantForm.restaurantForm.controls.email.value,
      location: this.addRestaurantForm.restaurantForm.controls.location.value,
      description: this.addRestaurantForm.restaurantForm.controls.description.value,
      note: this.addRestaurantForm.restaurantForm.controls.note.value,
    }

    if(this.selectedRestaurant){
      this.updateRestaurant(data)
    } else {
      this.restApiService.addRestaurant(data).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restaurant Added Successfully' });
        this.clearForm();
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Restaurant Registration failed' });
      });
    }
    // this.storageService.setItem('restaurant', data);

  }

  editRestaurant(restaurant: Restaurant) {
    this.selectedRestaurant = { ...restaurant };
    this.addRestaurantForm.restaurantForm.controls.name.setValue(this.selectedRestaurant.name);
    this.addRestaurantForm.restaurantForm.controls.phoneNumber.setValue(this.selectedRestaurant.phoneNumber)
    this.addRestaurantForm.restaurantForm.controls.email.setValue(this.selectedRestaurant.email)
    this.addRestaurantForm.restaurantForm.controls.location.setValue(this.selectedRestaurant.location)
    this.addRestaurantForm.restaurantForm.controls.description.setValue(this.selectedRestaurant.description)
    this.addRestaurantForm.restaurantForm.controls.note.setValue(this.selectedRestaurant.note)
    this.addRestaurantPopup = true;
  }

  updateRestaurant(data: any) {
    data.id = this.selectedRestaurant?.id;
    this.restApiService.updateRestaurant(data.id, data).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restaurant Updated Successfully' });
        this.clearForm();
        this.getAllRestaurants();
      },
      (error) => {
        console.log('error', error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Restaurant Update Failed' });
      }
    );
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure you want to delete ' + restaurant.name + '?',
      accept: () => {
        this.restApiService.deleteRestaurants(restaurant).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restaurant deleted successfully' });
            this.getAllRestaurants();
          },
          (error) => {
            console.error('Error deleting restaurant: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete restaurant' });
          }
        );
      }
    });
  }

  clearForm() {
    this.addRestaurantForm.resetForm();
  }

  closePopup(){
    this.addRestaurantPopup = false;
  }

}
