import { Component, OnInit } from '@angular/core';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<UsersModel>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    /* The program recieves the output from the getAll() observable and stores it in this.users */
    this.usersService.getAll().subscribe(data => this.users = data);
  }

}
