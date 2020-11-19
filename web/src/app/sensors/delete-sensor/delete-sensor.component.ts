import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorsService } from '../sensors.service';

@Component({
  selector: 'app-delete-sensor',
  templateUrl: './delete-sensor.component.html',
  styleUrls: ['./delete-sensor.component.scss']
})
export class DeleteSensorComponent implements OnInit {

  constructor(
    private sensorsService: SensorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get parameters from url
    this.activatedRoute.params.subscribe(parameters => {
      let id: number = parameters['id'];
      // Send DELETE HTTP
      this.deleteSensor(id);
    });
    // The program awaits 1000 ms for the request to finish
    setTimeout(() => {
      console.log("Awaiting...");
      // Redirect to /sensors
      this.router.navigate(['sensors']);
    }, 250);
  }

  deleteSensor(id: number) {
    this.sensorsService.delete(id).subscribe(data => {
      console.log("sensor deleted.")
    })
  }
}
