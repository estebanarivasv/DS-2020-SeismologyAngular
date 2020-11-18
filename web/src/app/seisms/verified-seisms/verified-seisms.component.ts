import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SeismsModel } from '../seisms.model';
import { SeismsService } from '../seisms.service';

@Component({
  selector: 'app-verified-seisms',
  templateUrl: './verified-seisms.component.html',
  styleUrls: ['./verified-seisms.component.scss']
})
export class VerifiedSeismsComponent implements OnInit {

  seisms: Array<SeismsModel>;

  constructor(private seismsService: SeismsService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.seismsService.getAllVerified().subscribe(data => this.seisms = data);
  }

  //TODO: Get nearest seism from coordinates

}
