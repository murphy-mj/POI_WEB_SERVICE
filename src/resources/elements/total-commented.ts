import { inject } from 'aurelia-framework';
import { DonationService } from '../../services/donation-service';
import { bindable } from 'aurelia-framework';
import { TotalComment } from '../../services/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DonationService, EventAggregator)
export class TotalComments {
  totalComments  = 0;

  constructor(private ds: DonationService, private ea: EventAggregator) {
    this.totalComments = ds.totalComments;
    ea.subscribe(TotalComment, msg => {
      this.totalComments = msg.totalComments;
    });
  }
}
