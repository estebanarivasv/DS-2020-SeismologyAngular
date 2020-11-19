import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get parameters from url
    this.activatedRoute.params.subscribe(parameters => {
      let id: number = parameters['id'];
      // Send DELETE HTTP
      this.deleteUser(id);
    });
    // The program awaits 1000 ms for the request to finish
    setTimeout(() => {
      console.log("Awaiting...");
      // Redirect to /users
      this.router.navigate(['users']);
    }, 250);
  }

  deleteUser(id: number) {
    this.usersService.delete(id).subscribe(data => {
      console.log("User deleted.")
    });
  }
}
