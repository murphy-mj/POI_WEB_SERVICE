import {Donation} from "./donation-types";
import {Point,Comment} from "./donation-types";

export class TotalUpdate {
  total: number;
  donation : Donation;
  constructor(total: number,donation: Donation) {
    this.total = total;
    this.donation = donation;
  }
}

export class TotalPUpdate {
  totalP: number;
  point : Point;
  constructor(totalP: number,point: Point) {
    this.totalP = totalP;
    this.point = point;
  }
}

export class TotalCatUpdate {
  totalCat: number;
  point : Point;
  constructor(totalCat: number,point: Point) {
    this.totalCat = totalCat;
    this.point = point;
  }
}

export class TotalComment {
  totalComments: number;
  point : Point;
  constructor(totalComments: number) {
    this.totalComments = totalComments;
  }
}
