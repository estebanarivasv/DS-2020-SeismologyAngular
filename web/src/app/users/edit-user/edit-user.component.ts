import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModel } from '../users.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  // REACTIVE FORM: Validations on component
  /* 
    1. define directive [formGroup]="addSensorForm"
    2. define formControlName attribute to make reference to each field
  */
  id: number;
  user: UsersModel;
  editUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createEditForm();
  }

  createEditForm() {
    this.activatedRoute.params.subscribe((params) => {

      // Get user to edit id from url
      this.id = params['id'];

      // Bring user to edit data from api
      this.usersService.getOne(this.id).subscribe(data => {
        this.user = data;

        let emailRegEx: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$";
        this.editUserForm = new FormGroup({
          id_num: new FormControl(this.user.id_num, Validators.required),
          email: new FormControl(this.user.email, [Validators.required, Validators.pattern(emailRegEx)]),
          admin: new FormControl(this.user.admin, Validators.required)
        });
      })
    });
  }

  sendHttpPut() {
    if (this.editUserForm.valid) {

      // Save the values to this.user variable
      this.user = this.editUserForm.value;

      this.usersService.put(this.id, this.user).subscribe(data => {
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
    return this.editUserForm.get('email').invalid && (this.editUserForm.get('email').touched || this.editUserForm.get('email').dirty);
  }

  get sendValidEmail() {
    return this.editUserForm.get('email').valid && (this.editUserForm.get('email').touched || this.editUserForm.get('email').dirty);
  }
  get sendRequiredAdmin() {
    return this.editUserForm.get('admin').invalid && (this.editUserForm.get('admin').touched || this.editUserForm.get('admin').dirty);
  }

  get sendValidAdmin() {
    return this.editUserForm.get('admin').valid && (this.editUserForm.get('admin').touched || this.editUserForm.get('admin').dirty);
  }


}
