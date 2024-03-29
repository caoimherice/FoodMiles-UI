import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-routing-machine';
import { HttpClient } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @Input()
  routeInfo: any;
  @Input()
  points: any;
  @Input()
  map: L.Map | undefined;
  myLines: any[] = [];

  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    // detect changes and reload the map
    this.changeDetector.detectChanges();
    this.getMap();
  }

  getMap() {
    if (this.map) {
      this.map.remove();
    }

    // the map bounds are fitted using the first and last points of the journey to centre the map correctly
    const firstPointString = this.points.points[0];
    const lastPointString = this.points.points[this.points.points.length - 1];
    const [firstLat, firstLng] = firstPointString.split(',');
    const [lastLat, lastLng] = lastPointString.split(',');
    const southWest = L.latLng(parseFloat(firstLat), parseFloat(firstLng));
    const northEast = L.latLng(parseFloat(lastLat), parseFloat(lastLng));
    const bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map('map').fitBounds(bounds, {padding: [50, 50]});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.points.points.forEach((pointString: string) => {
      const [lat, lng] = pointString.split(',');
      const point = L.latLng(parseFloat(lat), parseFloat(lng));
      // @ts-ignore
      L.marker(point).addTo(this.map);
    });

    this.myLines = []
    for(let route of this.routeInfo) {
      this.myLines.push({
        type: "Feature",
        properties: { transport_mode: route.transport_mode },
        geometry: { type: "LineString", coordinates: route.coordinates }
      })
    }
    L.geoJSON(this.myLines, {
      style: function(feature) {
        // @ts-ignore
        switch (feature.properties.transport_mode) {
          case "Truck":
            return { color: "hotpink", className: "truck" };
          case "Rail":
            return { color: "orange", className: "rail" };
          case "Ship":
            return { color: "greenyellow", className: "ship" };
          case "Barge":
            return { color: "mediumpurple", className: "barge" };
          default:
            return { color: "black" };
        }
      }
    }).addTo(this.map);

    // @ts-ignore
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<style>.legend { background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); } .legend p { margin: 5px; } .legend .truck { display: inline-block; width: 10px; height: 10px; background-color: hotpink; margin-right: 5px; } .legend .rail { display: inline-block; width: 10px; height: 10px; background-color: orange; margin-right: 5px; } .legend .ship { display: inline-block; width: 10px; height: 10px; background-color: greenyellow; margin-right: 5px; } .legend .barge { display: inline-block; width: 10px; height: 10px; background-color: mediumpurple; margin-right: 5px; }</style>";
      div.innerHTML += "<p><span class='truck'></span>Truck</p>";
      div.innerHTML += "<p><span class='rail'></span>Rail</p>";
      div.innerHTML += "<p><span class='ship'></span>Ship</p>";
      div.innerHTML += "<p><span class='barge'></span>Barge</p>";
      return div;
    };
    legend.addTo(this.map);
  }
}
