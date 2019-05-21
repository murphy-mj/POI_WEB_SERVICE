import { bindable } from 'aurelia-framework';
import {Donation} from "../../services/donation-types";

export class DonationsList {
  @bindable
  donations : Donation[];
}
