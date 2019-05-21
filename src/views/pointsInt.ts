import { inject } from 'aurelia-framework';
import { Point } from '../services/donation-types';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class PointsInt {
  points: Point[];
  categories: string[];
  totalCat = 0;

  constructor(private ds: DonationService) {
    this.points = ds.points;
    this.categories = ds.categories;
    this.totalCat = ds.totalCat ;
  }
}
