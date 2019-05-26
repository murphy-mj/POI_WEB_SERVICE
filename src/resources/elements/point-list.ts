import { bindable } from 'aurelia-framework';
import { Point, Location, rawPoint } from '../../services/donation-types';

export class PointList {
  @bindable
  points: Point[];
  @bindable
  pointsR: rawPoint[];
  // locations: Locations[];
}
