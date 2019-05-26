import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { TotalUpdate} from '../../services/messages';
import { Donation,Point, Comment } from '../../services/donation-types';
import { DonationService } from '../../services/donation-service';
import { bindable } from 'aurelia-framework';

//@inject(EventAggregator)
@inject(DonationService)
export class PointMap {
  mapId = 'point-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ds: DonationService) {
  }

  renderPoint() {
    for (let point of this.ds.points) {
      const pointStr = `${point.name} ${point.category}`;
       this.map.addMarker(point.location, pointStr, 'Points');
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
    this.map.addLayerGroup('Points');
    this.map.showLayerControl();
    this.renderPoint();

  }

}
