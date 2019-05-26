import { inject } from 'aurelia-framework';
import {Candidate, Comment, Donation, Point} from "../services/donation-types";
import {DonationService} from "../services/donation-service";


@inject(DonationService)
export class Stats {
  comments: Comment[];
  points: Point[];
  totalComments = 0;
  total = 0;
  donations: Donation[];
  candidates: Candidate[];

  constructor(private ds: DonationService) {
    this.candidates = ds.candidates;
    this.donations = ds.donations;
    this.total = ds.total;
    this.points = ds.points;
    this.comments = ds.comments;
    this.totalComments = ds.totalComments;
  }
}
