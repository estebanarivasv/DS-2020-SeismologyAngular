import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersModel } from '../users.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  // REACTIVE FORM: Validations on component
  /* 
    1. define directive [formGroup]="addSensorForm"
    2. define formControlName attribute to make reference to each field
    
  */

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  user: UsersModel;
  addUserForm: FormGroup;    // Tracks the value and validity state of a group of `FormControl` instances.

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm(): void {

    this.addUserForm = new FormGroup({
      email: new FormControl('', Validators.required),
      admin: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatch });
  }

  passwordMatch(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmPasswordControl = c.get('re_password');
    if (passwordControl.pristine || confirmPasswordControl.pristine) {
      return null;
    }
    if (passwordControl.value === confirmPasswordControl.value) {
      return null;
    }
    return { 'match': true };
  }

  sendHttpPost() {
    if (this.addUserForm.valid) {

      // Save the values to this.sensor variable
      this.user = this.addUserForm.value;

      this.usersService.post(this.user).subscribe(data => {
        // The program awaits 250 ms for the request to finish
        setTimeout(() => {
          console.log("Awaiting...");
          // Redirect to /users
          this.router.navigate(['users']);
        }, 250);
      });
    }
  }


  get sendRequiredEmail() {
    return this.addUserForm.get('email').invalid && (this.addUserForm.get('email').touched || this.addUserForm.get('email').dirty);
  }

  get sendValidEmail() {
    return this.addUserForm.get('email').valid && (this.addUserForm.get('email').touched || this.addUserForm.get('email').dirty);
  }
  get sendRequiredAdmin() {
    return this.addUserForm.get('admin').invalid && (this.addUserForm.get('admin').touched || this.addUserForm.get('admin').dirty);
  }

  get sendValidAdmin() {
    return this.addUserForm.get('admin').valid && (this.addUserForm.get('admin').touched || this.addUserForm.get('admin').dirty);
  }
  get sendRequiredPassword() {
    return this.addUserForm.get('password').invalid && (this.addUserForm.get('password').touched || this.addUserForm.get('password').dirty);
  }

  get sendValidPassword() {
    return this.addUserForm.get('password').valid && (this.addUserForm.get('password').touched || this.addUserForm.get('password').dirty);
  }
  get sendRequiredRePassword() {
    return this.addUserForm.get('re_password').invalid && (this.addUserForm.get('re_password').touched || this.addUserForm.get('re_password').dirty);
  }

  get sendValidRePassword() {
    return this.addUserForm.get('re_password').valid && (this.addUserForm.get('re_password').touched || this.addUserForm.get('re_password').dirty);
  }
}

