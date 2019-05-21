import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { TotalUpdate} from '../../services/messages';
import { Donation } from '../../services/donation-types';

@inject(EventAggregator)
export class DonateMap {
  mapId = 'donate-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ea: EventAggregator) {
    ea.subscribe(TotalUpdate, msg => {
      this.renderDonation(msg.donation);
    });

  }

  renderDonation(donation: Donation) {
    if (this.map) {
      const donationStr = `${donation.candidate.firstName} ${donation.candidate.lastName} €${donation.amount.toString()}`;
      this.map.addMarker(donation.location,donationStr);
      this.map.moveTo(12, donation.location);
    }
  }

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203 },
      zoom: 8,
      minZoom: 7
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
  }

}
