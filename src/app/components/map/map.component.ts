import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
// import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: L.Map | undefined;

  ngOnInit() {
    this.map = L.map('map').setView([35.8617, 104.1954], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const boatIcon = L.icon({
      iconUrl: "../../assets/boat-icon.png",
      iconSize: [32, 32], // Size of the icon image
    });

    const boatMarker = L.marker([35.8617, 104.1954], {
      icon: boatIcon,
    }).addTo(this.map);

    const routingControl = (<any>L).Routing.control({
      waypoints: [
        // L.latLng(35.8617, 104.1954), // China,
        // L.latLng(40.416775, -3.703790), // Madrid, Spain
        // L.latLng(53.2738, -9.0518) // Galway, Ireland
        // L.latLng(	38.946594, 121.608353), // Port of Origin
        // L.latLng(	41.346176, 2.168365) // Port of Destination
        L.latLng(13.65844, 100.54333), // China,
        L.latLng(9.077010, 101.735355), // China,
        L.latLng(1.269957, 103.796127), // China,
      ],
      routeWhileDragging: true,
      // router: new (<any>L).Routing.osrmv1({
      //   serviceUrl: 'http://router.project-osrm.org/route/v1',
      // }),
      lineOptions: {
        styles: [
          {color: '#00BFFF', weight: 6}, // Blue line with a weight of 6 pixels
        ]
      }
    }); routingControl.addTo(this.map)
    // const latlngs = [[38.91,-77.07], [37.77, -79.43], [39.04, -85.2]];
    // var polyline = L.polyline([[38.91,-77.07], [37.77, -79.43]], {color: 'red'});
    // polyline.addTo(this.map)

  }
}
