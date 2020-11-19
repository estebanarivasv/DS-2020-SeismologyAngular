import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorsModel } from '../sensors.model';
import { SensorsService } from '../sensors.service';

@Component({
  selector: 'app-view-sensor',
  templateUrl: './view-sensor.component.html',
  styleUrls: ['./view-sensor.component.scss']
})
export class ViewSensorComponent implements OnInit {

  public sensor: SensorsModel;

  constructor(
    private sensorsService: SensorsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get id number from url
    this.activatedRoute.params.subscribe(parameters => {
      let id: number = parameters['id'];
      this.setSensor(id);
    });
  }

  setSensor(id: number): void {
    this.sensorsService.getOne(id).subscribe(data => this.sensor = data)
  }

}
