import { Component, OnInit } from '@angular/core';
import { SensorsModel } from './sensors.model';
import { SensorsService } from './sensors.service';


// 1. FLASK CORS
// 2. HTTP REQUESTS
// 2.1. app.constants.ts
// 3. COMPONENTE
// 4. SERVICIO


@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensor: SensorsModel;
  sensors: Array<SensorsModel>;

  constructor(private sensorService: SensorsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  /*
  .subscribe(): Starts the execution of an Observable and listens for values that an Observable emits, 
  as well as for when it completes or errors. The value emited is stored in data.
  */
  
  // Sensors Service interaction
  checkStatus(): void {

  }

  getAll(): void {
    /* The program recieves the output from the getAll() observable and stores it in this.sensors */
    this.sensorService.getAll().subscribe(data => this.sensors = data);
  }

  getOne(): void {
    /* The output from the getOne() observable is stored in this.sensors */
    this.sensorService.getOne().subscribe(data => this.sensor = data);
  }

  add(): void {

  }

  edit(): void {

  }

  delete(id: number): void {
    this.sensorService.delete(id).subscribe(data => {
      /* The program recieves the output from the delete() observable and prints it in console.
         Then, the table is reloaded. */
      console.log(data)
      this.getAll();
    });
  }

}