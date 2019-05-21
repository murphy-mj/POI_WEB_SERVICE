import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Point, Location } from '../../services/donation-types';
import { DonationService } from '../../services/donation-service';

@inject(DonationService)
export class PointForm {
  name: string;
  category: string;
  description: string;
  pimage: string;
  //lat: number;
  //lng: number;
  //location: Location;

  @bindable
  points: Point[];

  @bindable
  categories: string[];

  selectedCategory = '';

  constructor(private ds: DonationService) {}
  // location: Location = { lat: 53.2734, lng: -7.7783203 };

  //const newLocation = new Location(lat: this.lat , lng: this.lng);
  location: Location = { lat: 53.2734, lng: -7.7783203 };

  addPoint() {
    // const newLocation = this.ds.createLocation(this.lat ,this.lng);
   // console.log(this.location.lat);
    //location: Location = { lat: this.location.lat, lng: this.location.lng };
    //const newLocation = new Location(lat: this.location.lat , lng: this.location.lng);
    this.ds.createPoint(this.name, this.selectedCategory, this.description, this.pimage, this.location);
  }
}
