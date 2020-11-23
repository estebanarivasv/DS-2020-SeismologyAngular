import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SensorsModel } from 'src/app/sensors/sensors.model';
import { SeismsInterface, SeismsModel } from '../seisms.model';
import { SeismsService } from '../seisms.service';
import { VSeismsDynamicModel } from './verified-seisms-filter.model';

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
  vSeismsFilterForm: FormGroup;

  // DATA STORING VARIABLES
  seisms: Array<SeismsModel>;
  sensor: SensorsModel;

  // PAGINATION VARIABLES
  totalItems = 0;
  page: number = 1;
  pageSize = 10;
  previousPage = 0;


  constructor(
    private seismsService: SeismsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // First, set the basic table layout; then, gets all Seisms
    this.filters = this.setInitialPageSettings();
    this.getAll();
  }

  // Function that sets the initial settings from tale pagination
  setInitialPageSettings(): VSeismsDynamicModel {
    let filters: VSeismsDynamicModel = new VSeismsDynamicModel();
    filters.elem_per_page = 10;
    filters.page = 1;
    filters.sort_by = 'id_num';
    filters.direction = 'desc';
    return filters;
  }

  // Store the data and make pagination
  getAll(): void {
    this.seismsService.getAllVerified(this.filters).subscribe(
      (res: HttpResponse<Array<SeismsInterface>>) => {
        this.paginateTable(res.body, res.headers)
      });
  }

  protected paginateTable(data: Array<SeismsInterface>, headers: HttpHeaders) {
    // Total items get the total count of seisms from the request
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    // Store the data
    this.seisms = data;
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
    if (this.sensor) { this.filters.sensor_id = this.sensor.id_num; }
    else { delete this.filters.sensor_id; }

    if (this.depthFrom) { this.filters.depth_min = this.depth_min;
    } else {
      delete this.filters.depth_from;
    }
    if (this.depthTo) {
      this.filter.depth_to = this.depthTo;
    } else {
      delete this.filter.depth_to;
    }

    if (this.magnitudeFrom) {
      this.filter.magnitude_from = this.magnitudeFrom;
    } else {
      delete this.filter.magnitude_from;
    }

    if (this.magnitudeTo) {
      this.filter.magnitude_to = this.magnitudeTo;
    } else {
      delete this.filter.magnitude_to;
    }

    this.findAll();
  }

}



@Component({
  selector: 'app-vseism',
  templateUrl: './vseism.component.html',
  styleUrls: ['./vseism.component.css']
})
export class VseismComponent implements OnInit {

  // Componente Search
  sensorModel: SensorModel;

  seisms: Array<SeismModel>;
  isAdmin: boolean = false;
  filter: SeismFilter;
  totalItems = 0;
  page: number = 1;
  pageSize = 10;
  previousPage = 0;

  //Depth y Magnitude
  depthFrom: number;
  depthTo: number;
  magnitudeFrom: number;
  magnitudeTo: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private seismService: SeismService,
    private tokenService: TokenService,
    private sensorService: SensorService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }




  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getAdmin()) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    this.filter = this.settingPage();
    this.findAll();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.filter.sort_by = column;
    this.filter.direction = direction;
    this.findAll();
  }

  findAll(): void {
    this.seismService.findAllVerified(this.filter).subscribe(
      (res: HttpResponse<Iseism[]>) => {
        this.paginate(res.body, res.headers);
      }

    );
  }

  protected paginate(data: Iseism[], headers: HttpHeaders) {
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.seisms = data;
  }

  // Evento componente pagination
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.filter.page = this.page;
    this.findAll();
  }

  onSelect(seism: SeismModel): void {
    this.selectedSeism = seism;
  }



  settingPage(): SeismFilter {
    let filter: SeismFilter = new SeismFilter();
    filter.elem_per_page = 10;
    filter.page = 1;
    filter.sort_by = 'id';
    filter.direction = 'desc';
    return filter;
  }

}
