import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";
import {StyleFunction} from "leaflet";

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
    // private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getMap();
  }

  getMap() {
    // this.map = L.map('map').setView([13.70482, 100.57248], 10);
    console.log("points", this.routeInfo)
    const firstPointString = this.routeInfo[0].origin_lat_lng;
    const lastPointString = this.routeInfo[this.routeInfo.length - 1].destination_lat_lng;
    const [firstLat, firstLng] = firstPointString.split(',');
    const [lastLat, lastLng] = lastPointString.split(',');
    const southWest = L.latLng(parseFloat(firstLat), parseFloat(firstLng));
    const northEast = L.latLng(parseFloat(lastLat), parseFloat(lastLng));
    const bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map('map').fitBounds(bounds, {padding: [2000, 2000]});
    // this.map.fitBounds(bounds);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    console.log("points")
    console.log(this.points.points)
    const smallIcon = L.Icon.Default.extend({ iconSize: [10, 10] });
    this.points.points.forEach((pointString: string) => {
      const [lat, lng] = pointString.split(',');
      const point = L.latLng(parseFloat(lat), parseFloat(lng));
      // @ts-ignore
      L.marker(point, { icon: new smallIcon() }).addTo(this.map);
    });

    // L.geoJSON(geojsonFeature, {
    //   style: {
    //     color: 'red',
    //     weight: 5,
    //     opacity: 0.7,
    //     lineCap: 'round'
    //   }
    // }).addTo(this.map);

    for(let route of this.routeInfo) {
      console.log("transportmode")
      console.log(route.transport_mode)
      this.myLines.push({
        type: "Feature",
        properties: { transport_mode: route.transport_mode },
        geometry: { type: "LineString", coordinates: route.coordinates }
      })
    }
    console.log(this.myLines)
    L.geoJSON(this.myLines, {
      style: function(feature) {
        console.log("style function called");
        console.log(feature);
        // @ts-ignore
        console.log(feature.properties);
        // @ts-ignore
        console.log(feature.properties.transport_mode);
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
    console.log("finished")


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
