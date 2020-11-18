import { Component, OnInit } from '@angular/core';
import { SeismsModel } from '../seisms.model';
import { SeismsService } from '../seisms.service';

@Component({
  selector: 'app-unverified-seisms',
  templateUrl: './unverified-seisms.component.html',
  styleUrls: ['./unverified-seisms.component.scss']
})
export class UnverifiedSeismsComponent implements OnInit {

  seisms: Array<SeismsModel>;

  constructor(private seismsService: SeismsService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.seismsService.getAllVerified().subscribe(data => this.seisms = data);
  }

}
