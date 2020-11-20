import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModel } from 'src/app/users/users.model';
import { UsersService } from 'src/app/users/users.service';
import { SensorsModel } from '../sensors.model';
import { SensorsService } from '../sensors.service';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.scss']
})
export class EditSensorComponent implements OnInit {

  // REACTIVE FORM: Validations on component
  /* 
    1. import reactiveformsmodule on app.module.ts
    2. define directive [formGroup]="editSensorForm"
    3. define formControlName attribute to make reference to each field
  */

  id: number;
  sensor: SensorsModel;
  users: Array<UsersModel>;
  editSensorForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorsService: SensorsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createEditForm();
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  createEditForm() {
    this.activatedRoute.params.subscribe((params) => {

      // Get sensor to edit id from url
      this.id = params['id'];

      // Bring sensor to edit data from api
      this.sensorsService.getOne(this.id).subscribe(data => {
        this.sensor = data;

        let ipRegExp: string = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
        this.editSensorForm = new FormGroup({
          id_num: new FormControl(this.sensor.id_num, Validators.required),
          name: new FormControl(this.sensor.name, Validators.required),
          ip: new FormControl(this.sensor.ip, [Validators.required, Validators.pattern(ipRegExp)]),
          port: new FormControl(this.sensor.port, Validators.required),
          active: new FormControl(this.sensor.active, Validators.required),
          status: new FormControl(this.sensor.status, Validators.required),
          user_id: new FormControl(this.sensor.user.id_num, [Validators.required, ValidateEmailOption])

        });
      })
    });
  }
  sendHttpPut() {
    if (this.editSensorForm.valid) {

      // Save the values to this.sensor variable
      this.sensor = this.editSensorForm.value;

      this.sensorsService.put(this.id, this.sensor).subscribe(data => {
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
    return this.editSensorForm.get('name').invalid && (this.editSensorForm.get('name').touched || this.editSensorForm.get('name').dirty);
  }
  get sendRequiredIp() {
    return this.editSensorForm.get('ip').invalid && (this.editSensorForm.get('ip').touched || this.editSensorForm.get('ip').dirty);
  }
  get sendRequiredPort() {
    return this.editSensorForm.get('port').invalid && (this.editSensorForm.get('port').touched || this.editSensorForm.get('port').dirty);
  }
  get sendRequiredActive() {
    return this.editSensorForm.get('active').invalid && (this.editSensorForm.get('active').touched || this.editSensorForm.get('active').dirty);
  }
  get sendRequiredStatus() {
    return this.editSensorForm.get('status').invalid && (this.editSensorForm.get('status').touched || this.editSensorForm.get('status').dirty);
  }
  get sendRequiredUserId() {
    return this.editSensorForm.get('user_id').invalid && (this.editSensorForm.get('user_id').touched || this.editSensorForm.get('user_id').dirty);
  }

  get sendValidName() {
    return this.editSensorForm.get('name').valid && (this.editSensorForm.get('name').touched || this.editSensorForm.get('name').dirty);
  }
  get sendValidIp() {
    return this.editSensorForm.get('ip').valid && (this.editSensorForm.get('ip').touched || this.editSensorForm.get('ip').dirty);
  }
  get sendValidPort() {
    return this.editSensorForm.get('port').valid && (this.editSensorForm.get('port').touched || this.editSensorForm.get('port').dirty);
  }
  get sendValidActive() {
    return this.editSensorForm.get('active').valid && (this.editSensorForm.get('active').touched || this.editSensorForm.get('active').dirty);
  }
  get sendValidStatus() {
    return this.editSensorForm.get('status').valid && (this.editSensorForm.get('status').touched || this.editSensorForm.get('status').dirty);
  }
  get sendValidUserId() {
    return this.editSensorForm.get('user_id').valid && (this.editSensorForm.get('user_id').touched || this.editSensorForm.get('user_id').dirty);
  }

}

function ValidateEmailOption(control: AbstractControl): { [key: string]: any } | null {
  if (control.value == 0) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
}