import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { TotalUpdate} from '../../services/messages';
import { Donation,Point, Comment } from '../../services/donation-types';

@inject(EventAggregator)
export class PointMap {
  mapId = 'point-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ea: EventAggregator) {
    ea.subscribe(TotalUpdate, msg => {
      this.renderComment(msg.comment);
    });

  }

  renderComment(comment: Comment){

    if (this.map) {
      const pointStr = 'Str';
    //  const pointStr = `${comment.point.name} ${comment.point.description} ${comment.opinion}`;
   //   this.map.addMarker(comment.point.location,pointStr);
   //   this.map.moveTo(12, comment.point.location);
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
