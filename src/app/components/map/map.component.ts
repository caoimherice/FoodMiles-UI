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
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const routingControl = (<any>L).Routing.control({
      waypoints: [
        L.latLng(51.5, -0.1),
        L.latLng(51.51, -0.12)
      ],
      routeWhileDragging: true
    });
    routingControl.addTo(this.map);
  }
}
