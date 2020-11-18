import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SeismsModel } from '../../seisms.model';
import { SeismsService } from '../../seisms.service';

@Component({
  selector: 'app-view-unverified',
  templateUrl: './view-unverified.component.html',
  styleUrls: ['./view-unverified.component.scss']
})
export class ViewUnverifiedComponent implements OnInit {

  public seism: SeismsModel;

  constructor(
    private seismsService: SeismsService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer)
  { }

  ngOnInit(): void {
    // Get id number from url
    this.activatedRoute.params.subscribe(parameters => {
      let id: number = parameters['id'];
      this.setSeism(id);
    });
  }

  setSeism(id: number): void {
    // Access to Seisms service to get the seism
    this.seismsService.getOneUnverified(id).subscribe(data => {
      return this.seism = data;
    });
  }
  
  getMapURL() {
    let map_url: string = "https://maps.google.com/maps?q=" + this.seism.latitude + ", " + this.seism.longitude + "&t=k&z=9&ie=UTF8&iwloc=&output=embed";
    return this.sanitizer.bypassSecurityTrustResourceUrl(map_url);
  }

}
