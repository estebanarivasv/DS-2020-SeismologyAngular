import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorsModel } from 'src/app/sensors/sensors.model';
import { SensorsService } from 'src/app/sensors/sensors.service';
import { SeismsModel } from '../../seisms.model';
import { SeismsService } from '../../seisms.service';

@Component({
  selector: 'app-edit-unverified',
  templateUrl: './edit-unverified.component.html',
  styleUrls: ['./edit-unverified.component.scss']
})
export class EditUnverifiedComponent implements OnInit {

  // REACTIVE FORM: Validations on component
  /* 
    1. import reactiveformsmodule on app.module.ts
    2. define directive [formGroup]="editUSeismForm"
    3. define formControlName attribute to make reference to each field
  */

  id: number;
  seism: SeismsModel;
  sensors: Array<SensorsModel>;
  editUSeismForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorsService: SensorsService,
    private seismsService: SeismsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createEditForm();
    this.sensorsService.getAll().subscribe(data => {
      this.sensors = data;
    });
  }


  createEditForm() {
    this.activatedRoute.params.subscribe((params) => {

      // Get seism to edit id from url
      this.id = params['id'];

      // Bring seism to edit data from api
      this.seismsService.getOneUnverified(this.id).subscribe(data => {
        this.seism = data;

        this.editUSeismForm = new FormGroup({
          depth: new FormControl(this.seism.depth, Validators.required),
          magnitude: new FormControl(this.seism.magnitude, Validators.required),
          verified: new FormControl(this.seism.verified, Validators.required)
        });
      })
    });
  }

  sendHttpPut() {
    if (this.editUSeismForm.valid) {

      // Save the values to this.sensor variable
      this.seism = this.editUSeismForm.value;

      this.seismsService.putUnverified(this.id, this.seism).subscribe(data => {
        // The program awaits 250 ms for the request to finish
        setTimeout(() => {
          console.log("Awaiting...");
          // Redirect to /users
          this.router.navigate(['unverified-seisms']);
        }, 250);
      });
    }
  }

  get sendRequiredDepth() {
    return this.editUSeismForm.get('depth').invalid && (this.editUSeismForm.get('depth').touched || this.editUSeismForm.get('depth').dirty);
  }

  get sendValidDepth() {
    return this.editUSeismForm.get('depth').valid && (this.editUSeismForm.get('depth').touched || this.editUSeismForm.get('depth').dirty);
  }
  get sendRequiredMagnitude() {
    return this.editUSeismForm.get('magnitude').invalid && (this.editUSeismForm.get('magnitude').touched || this.editUSeismForm.get('magnitude').dirty);
  }

  get sendValidMagnitude() {
    return this.editUSeismForm.get('magnitude').valid && (this.editUSeismForm.get('magnitude').touched || this.editUSeismForm.get('magnitude').dirty);
  }
  get sendRequiredVerified() {
    return this.editUSeismForm.get('verified').invalid && (this.editUSeismForm.get('verified').touched || this.editUSeismForm.get('verified').dirty);
  }

  get sendValidVerified() {
    return this.editUSeismForm.get('verified').valid && (this.editUSeismForm.get('verified').touched || this.editUSeismForm.get('verified').dirty);
  }
}


