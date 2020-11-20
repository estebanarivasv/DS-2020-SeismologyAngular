import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersModel } from 'src/app/users/users.model';
import { UsersService } from 'src/app/users/users.service';
import { SensorsModel } from '../sensors.model';
import { SensorsService } from '../sensors.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss']
})
export class AddSensorComponent implements OnInit {

  // REACTIVE FORM: Validations on component
  /* 
    1. import reactiveformsmodule on app.module.ts
    2. define directive [formGroup]="addSensorForm"
    3. define formControlName attribute to make reference to each field
    
  */

  constructor(
    private sensorsService: SensorsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  sensor: SensorsModel;
  users: Array<UsersModel>;
  addSensorForm: FormGroup;         // Tracks the value and validity state of a group of `FormControl` instances.

  ngOnInit(): void {
    this.createAddForm();
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  createAddForm(): void {

    let ipRegExp: string = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
    this.addSensorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ip: new FormControl('', [Validators.required, Validators.pattern(ipRegExp)]),
      port: new FormControl('', Validators.required),
      active: new FormControl(true, Validators.required),
      status: new FormControl(true, Validators.required),
      user_id: new FormControl(0, [Validators.required, ValidateEmailOption])

    });
  }

  sendHttpPost() {
    if (this.addSensorForm.valid) {
      
      // Save the values to this.sensor variable
      this.sensor = this.addSensorForm.value;

      this.sensorsService.post(this.sensor).subscribe(data => {
        // The program awaits 250 ms for the request to finish
        setTimeout(() => {
          console.log("Awaiting...");
          // Redirect to /users
          this.router.navigate(['sensors']);
        }, 250);
      });
    }
  }


  getUserNumber(user: UsersModel) {
    return user.id_num
  }

  get sendRequiredName() {
    return this.addSensorForm.get('name').invalid && (this.addSensorForm.get('name').touched || this.addSensorForm.get('name').dirty);
  }
  get sendRequiredIp() {
    return this.addSensorForm.get('ip').invalid && (this.addSensorForm.get('ip').touched || this.addSensorForm.get('ip').dirty);
  }
  get sendRequiredPort() {
    return this.addSensorForm.get('port').invalid && (this.addSensorForm.get('port').touched || this.addSensorForm.get('port').dirty);
  }
  get sendRequiredActive() {
    return this.addSensorForm.get('active').invalid && (this.addSensorForm.get('active').touched || this.addSensorForm.get('active').dirty);
  }
  get sendRequiredStatus() {
    return this.addSensorForm.get('status').invalid && (this.addSensorForm.get('status').touched || this.addSensorForm.get('status').dirty);
  }
  get sendRequiredUserId() {
    return this.addSensorForm.get('user_id').invalid && ( this.addSensorForm.get('user_id').touched || this.addSensorForm.get('user_id').dirty );
  }

  get sendValidName() {
    return this.addSensorForm.get('name').valid && (this.addSensorForm.get('name').touched || this.addSensorForm.get('name').dirty);
  }
  get sendValidIp() {
    return this.addSensorForm.get('ip').valid && (this.addSensorForm.get('ip').touched || this.addSensorForm.get('ip').dirty);
  }
  get sendValidPort() {
    return this.addSensorForm.get('port').valid && (this.addSensorForm.get('port').touched || this.addSensorForm.get('port').dirty);
  }
  get sendValidActive() {
    return this.addSensorForm.get('active').valid && (this.addSensorForm.get('active').touched || this.addSensorForm.get('active').dirty);
  }
  get sendValidStatus() {
    return this.addSensorForm.get('status').valid && (this.addSensorForm.get('status').touched || this.addSensorForm.get('status').dirty);
  }
  get sendValidUserId() {
    return this.addSensorForm.get('user_id').valid && (this.addSensorForm.get('user_id').touched || this.addSensorForm.get('user_id').dirty);
  }


}

function ValidateEmailOption(control: AbstractControl): {[key: string]: any} | null  {
  if ( control.value == 0 ) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
}