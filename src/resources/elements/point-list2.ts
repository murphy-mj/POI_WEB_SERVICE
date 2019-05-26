import { bindable } from 'aurelia-framework';
import { Point, Location, rawPoint } from '../../services/donation-types';

export class PointList2 {
  @bindable
  points: Point[];
  @bindable
  pointsR: rawPoint[];
}
