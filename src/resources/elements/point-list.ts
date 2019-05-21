import { bindable } from 'aurelia-framework';
import { Point, Location } from '../../services/donation-types';

export class PointList {
  @bindable
  points: Point[];
  // locations: Locations[];
}
