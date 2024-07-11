import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Restaurant } from "../models/restaurant.model";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestApiService{

  constructor(
    private fireStore: AngularFirestore,
  ){}

  addRestaurant(data: Restaurant): Observable<any> {
    return from(this.fireStore.collection('Restaurant').add(data));
  }

  getAllRestaurants(): Observable<any>{
    return from(this.fireStore.collection('/Restaurant').snapshotChanges());
  }

  deleteRestaurants(restaurant: Restaurant): Observable<any>{
    console.log('restaurant', restaurant)
    return from(this.fireStore.collection('/Restaurant').doc(restaurant.id).delete());
  }

  updateRestaurant(id: string, data: Restaurant): Observable<any> {
    return from(this.fireStore.collection('Restaurant').doc(id).update(data));
  }
}
