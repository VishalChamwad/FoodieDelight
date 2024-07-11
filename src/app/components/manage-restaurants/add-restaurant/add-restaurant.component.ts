import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent {

  restaurantForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      description: [''],
      note: ['']
    });
  }

  resetForm(){
    this.restaurantForm.reset();
  }

}
