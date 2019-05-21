import { bindable } from 'aurelia-framework';
import { Location } from '../../services/donation-types';

export class Coordinates {
  @bindable
  location: Location;
}
