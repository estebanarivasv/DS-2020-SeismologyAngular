import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeismsService } from '../../seisms.service';

@Component({
  selector: 'app-delete-unverified',
  templateUrl: './delete-unverified.component.html',
  styleUrls: ['./delete-unverified.component.scss']
})
export class DeleteUnverifiedComponent implements OnInit {

  constructor(
    private seismsService: SeismsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get parameters from url
    this.activatedRoute.params.subscribe(parameters => {
      let id: number = parameters['id'];
      // Send DELETE HTTP
      this.deleteSeism(id);
    });
    // The program awaits 1000 ms for the request to finish
    setTimeout(() => {
      console.log("Awaiting...");
      // Redirect to /unverified-seisms
      this.router.navigate(['unverified-seisms']);
    }, 250);
    
  }

  deleteSeism(id: number) {
    this.seismsService.deleteUnverified(id).subscribe(data => {
      console.log("Seism deleted.");
    })
  }
}
