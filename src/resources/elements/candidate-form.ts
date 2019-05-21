import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Candidate } from '../../services/donation-types';
import { DonationService } from '../../services/donation-service';

@inject(DonationService)
export class CandidateForm {
  firstName: string;
  lastName: string;
  office: string;
  @bindable candidates: Candidate[];

  constructor(private ds: DonationService) {}

  addCandidate() {
    this.ds.createCandidate(this.firstName, this.lastName, this.office);
  }
}
