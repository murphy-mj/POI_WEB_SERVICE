import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate, Donation, Location,Comment, Point } from '../../services/donation-types';
import {DonationService} from "../../services/donation-service";

@inject(DonationService)
export class CommentForm {
  @bindable
  Points: Point[];

  opinion = '';
  selectedPoint : Point = null;

  location: Location = { lat: 53.2734, lng: -7.7783203 };
  //location: Location = { lat: this.location.lat, lng: this.location.lng };
  constructor (private ds: DonationService) {}

  makeComment() {
    this.ds.createComment(this.opinion, this.selectedPoint);
  }
}
