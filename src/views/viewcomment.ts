import { inject } from 'aurelia-framework';
import {Candidate, Donation, Location, Point, rawPoint, User, Comment } from "../services/donation-types";
import {DonationService} from "../services/donation-service";


@inject(DonationService)
export class viewComment {
  comments: Comment[];
  points: Point[];



  constructor(private ds: DonationService) {
    this.comments = ds.comments;
     this.points = ds.points;

  }

}
