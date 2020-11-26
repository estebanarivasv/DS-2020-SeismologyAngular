import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isAdmin: boolean;

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.getAdmin();
  }

}
