import { QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../app-sorting.directive';
import { PaginationModel } from '../pagination.model';
import { UsersModel } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { SensorsDynamicModel } from './sensors-filter.model';
import { SensorsModel, SensorsRequestModel } from './sensors.model';
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

  // FILTERING VARIABLES
  filters: SensorsDynamicModel;  //   Dynamic data filters of table

  // Template-driven forms variables (at the beginning, they are empty)
  users: Array<UsersModel>;
  user: UsersModel;

  name: string;
  status: boolean;
  active: boolean;
  user_id: number;

  // DATA STORING VARIABLES
  sensorsRequest: SensorsRequestModel
  sensors: Array<SensorsModel>;
  pagination: PaginationModel;

  // PAGINATION VARIABLES
  totalItems = 0;
  page = 1;
  pageSize = 10;
  previousPage = this.page - 1;
  numPages = 0;

  // SORTING VARIABLES
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private sensorService: SensorsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    // First, set the basic table layout; then, gets all Seisms
    this.usersService.getAll().subscribe(data => { this.users = data })
    this.user_id = 0;
    this.filters = this.setInitialPageSettings();
    this.getAll();
  }

  
  // Function that sets the initial settings from tale pagination
  setInitialPageSettings(): SensorsDynamicModel {
    let filters: SensorsDynamicModel = new SensorsDynamicModel();
    filters.elem_per_page = 10;
    filters.page = 1;
    filters.sort_by = 'id_num';
    filters.direction = 'asc';
    return filters;
  }

  // Store the data and make pagination
  getAll(): void {
    this.sensorService.getAllSensors(this.filters).subscribe(
      response => {
        this.sensors = response.sensors;
        this.pagination = response.pagination;

        this.totalItems = this.pagination.total_results;
        this.page = this.pagination.page_number;
        this.pageSize = this.pagination.page_size;
        this.previousPage = this.page - 1;
        this.numPages = this.pagination.num_pages;
      }
    );
  }

  /* 
    If the actual page is different than the previous one, the previousPage is updated and 
    pagesTransition() is called
  */
  loadNextPage(page: number) {
    this.filters.elem_per_page = this.pageSize;
    this.filters.page = page;
    this.getAll();
  }

  applyFilters() {
    if (this.name) { this.filters.name = this.name; }
    else { delete this.filters.name; }

    if (this.status) { this.filters.status = this.status; }
    else { delete this.filters.status; }

    if (this.active) { this.filters.active = this.active; }
    else { delete this.filters.active; }

    if (this.user_id) { this.filters.user_id = this.user_id; }
    else { delete this.filters.user_id; }

    this.getAll();
  }

  clearFilters() {
    if (this.filters) {
      delete this.filters.name;
      delete this.filters.status;
      delete this.filters.active;
      delete this.filters.user_id;
      this.name = null;
      this.status = null;
      this.active = null;
      this.user_id = 0;
    }
    this.getAll();
  }

  getUserNumber(user: UsersModel) {
    return user.id_num
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
    this.getAll();
  }
}