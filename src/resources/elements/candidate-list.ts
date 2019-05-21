import { bindable } from 'aurelia-framework';
import { Candidate } from '../../services/donation-types';

export class CandidateList {
  @bindable
  candidates: Candidate[];
}
