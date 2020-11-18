import { Component, OnInit } from '@angular/core';
import { SensorsModel } from '../sensors.model';
import { SensorsService } from '../sensors.service';

@Component({
  selector: 'app-view-sensor',
  templateUrl: './view-sensor.component.html',
  styleUrls: ['./view-sensor.component.scss']
})
export class ViewSensorComponent implements OnInit {

  sensor: SensorsModel;
  id: number = null;

  constructor(private sensorsService: SensorsService) { }

  ngOnInit(): void {
    if (this.id != null) {
      this.getOne(this.id)
    }
  }

  getOne(id: number): void {
    this.sensorsService.getOne(id).subscribe(data => this.sensor = data)
  }

}
