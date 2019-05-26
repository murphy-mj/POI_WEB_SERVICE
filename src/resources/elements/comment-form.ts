import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate, Donation, Location,Comment, Point, rawPoint } from '../../services/donation-types';
import {DonationService} from "../../services/donation-service";

@inject(DonationService)
export class CommentForm {
  @bindable
  points: Point[];


  opinion = '';
  selectedPoint : Point = null;

  constructor (private ds: DonationService) {}

  makeComment() {
    this.ds.createComment(this.opinion, this.selectedPoint);
  }
}
