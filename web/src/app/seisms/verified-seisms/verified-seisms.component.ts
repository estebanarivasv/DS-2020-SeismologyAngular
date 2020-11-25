import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { SensorsModel } from 'src/app/sensors/sensors.model';
import { SeismsInterface, SeismsModel, SeismsRequestModel } from '../seisms.model';
import { SeismsService } from '../seisms.service';
import { VSeismsDynamicModel } from './verified-seisms-filter.model';
import * as moment from 'moment';
import { SensorsService } from 'src/app/sensors/sensors.service';
import { NgbdSortableHeader, SortEvent } from './verified-seisms-sorting.directive';
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { PaginationModel } from 'src/app/pagination.model';

@Component({
  selector: 'app-verified-seisms',
  templateUrl: './verified-seisms.component.html',
  styleUrls: ['./verified-seisms.component.scss']
})
export class VerifiedSeismsComponent implements OnInit {

  // TEMPLATE-DRIVEN FORMS: Validations on component
  /* 
    1. Build the basic form. (verified-seisms-filter.model.ts)
    2. Define a sample data model.
    3. Examine how ngModel reports control states using CSS classes.
    4. Add custom CSS to provide visual feedback on the status.
    5. Handle form submission using the ngSubmit output property of the form.
  */

  // FILTERING VARIABLES
  filters: VSeismsDynamicModel;  //   Dynamic data filters of table

  // Template-driven forms variables (at the beginning, they are empty)
  sensors: Array<SensorsModel>;
  sensor: SensorsModel;
  mag_min: number;
  mag_max: number;
  depth_min: number;
  depth_max: number;
  sensor_id: number;

  from_date = moment('').utc();
  to_date = moment('').utc();

  // DATA STORING VARIABLES
  request: SeismsRequestModel
  seisms: Array<SeismsModel>;
  pagination: PaginationModel;


  // PAGINATION VARIABLES
  totalItems = 0;
  page: number = 1;
  pageSize = 10;
  previousPage = this.page - 1;
  numPages = 0;

  // SORTING VARIABLES
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(
    private seismsService: SeismsService,
    private sensorsService: SensorsService
  ) { }

  ngOnInit(): void {
    // First, set the basic table layout; then, gets all Seisms
    this.sensorsService.getAll().subscribe(data => {
      this.sensors = data;
    })
    this.sensor_id = 0;
    this.filters = this.setInitialPageSettings();
    this.getAll();
  }

  // Function that sets the initial settings from tale pagination
  setInitialPageSettings(): VSeismsDynamicModel {
    let filters: VSeismsDynamicModel = new VSeismsDynamicModel();
    filters.elem_per_page = 10;
    filters.page = 1;
    filters.sort_by = 'id_num';
    filters.direction = 'asc';
    return filters;
  }

  // Store the data and make pagination
  getAll(): void {
    this.seismsService.getAllVerified(this.filters).subscribe(
      response => {
        this.pagination = Object.assign(new PaginationModel(), response.pagination);
        console.log(data)
        console.log(this.pagination)
        this.setData(response)
      }
    );
  }

  setData(data: SeismsRequestModel) {
    this.pagination = data.pagination;
    this.seisms = data.seisms;

  }

  /* 
    If the actual page is different than the previous one, the previousPage is updated and 
    pagesTransition() is called
  */
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.pagesTransition();
    }
  }

  pagesTransition() {
    this.filters.page = this.page;
    this.getAll();
  }

  applyFilters() {
    if (this.sensor_id) { this.filters.sensor_id = this.sensor_id; }
    else { delete this.filters.sensor_id; }

    if (this.depth_min) { this.filters.depth_min = this.depth_min; }
    else { delete this.filters.depth_min; }

    if (this.depth_max) { this.filters.depth_max = this.depth_max; }
    else { delete this.filters.depth_max; }

    if (this.mag_min) { this.filters.mag_min = this.mag_min; }
    else { delete this.filters.mag_min; }

    if (this.mag_max) { this.filters.mag_max = this.mag_max; }
    else { delete this.filters.mag_max; }

    if (this.from_date) { this.filters.from_date = this.from_date.toISOString(); }
    else { delete this.filters.from_date; }

    if (this.to_date) { this.filters.to_date = this.to_date.toISOString(); }
    else { delete this.filters.to_date; }

    this.getAll();
  }

  clearFilters() {
    if (this.filters) {
      delete this.filters.sensor_id;
      delete this.filters.depth_min;
      delete this.filters.depth_max;
      delete this.filters.mag_min;
      delete this.filters.mag_max;
      delete this.filters.from_date;
      delete this.filters.to_date;
      this.from_date = moment('').utc();;
      this.to_date = moment('').utc();;
    }
    console.log(this.filters)
    this.getAll();
  }

  getSensorNumber(sensor: SensorsModel) {
    return sensor.id_num
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.filters.sort_by = column;
    this.filters.direction = direction;
    console.log(this.headers);
    console.log(this.filters);
    this.getAll();
  }
}