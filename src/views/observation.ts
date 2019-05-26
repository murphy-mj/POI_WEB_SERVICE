import { inject } from 'aurelia-framework';
import {Candidate, Donation,Comment,Point} from "../services/donation-types";
import {DonationService} from "../services/donation-service";


@inject(DonationService)
export class Observation {

  comments: Comment[];

  points: Point[];

  totalComments =0;

  constructor(private ds: DonationService) {
    this.points = ds.points;
    this.comments = ds.comments;
    this.totalComments = ds.totalComments;
  }
}
