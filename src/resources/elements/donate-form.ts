import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate, Donation, Location } from '../../services/donation-types';
import {DonationService} from "../../services/donation-service";

@inject(DonationService)
export class DonateForm {
  @bindable
  paymentMethods: string[];
  @bindable
  candidates: Candidate[];
  //@bindable
  //location: Location = {};

  amount = '0';
  selectedMethod = '';
  selectedCandidate : Candidate = null;
  lat = 0;
  lng = 0;

  //location: Location = { lat: 53.2734, lng: -7.7783203 };

  location: Location = { lat: this.lat, lng: this.lng };
  constructor (private ds: DonationService) {}

  makeDonation() {
    this.ds.donate(parseInt(this.amount), this.selectedMethod, this.selectedCandidate, this.location);
  }
}
