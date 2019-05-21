import { inject } from 'aurelia-framework';
import { DonationService } from '../../services/donation-service';
import { bindable } from 'aurelia-framework';
import { TotalPUpdate } from '../../services/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DonationService, EventAggregator)
export class TotalPoints {
  totalP = 0;

  constructor(private ds: DonationService, private ea: EventAggregator) {
    this.totalP = ds.totalP;
    ea.subscribe(TotalPUpdate, msg => {
      this.totalP = msg.totalP;
    });
  }
}
