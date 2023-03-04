import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: L.Map | undefined;

  origin: string = "Seville";

  destination: string = "Terminal Marítima del Guadalquivir (TMG)";

  routeInfo: any;

  routeList: any[] = [];
  myLines: any[] = [];
  legs = [["Seville", "Terminal Marítima del Guadalquivir (TMG)"],["Terminal Marítima del Guadalquivir (TMG)", "Bilbao Rail Terminal"], ["Bilbao Rail Terminal", "CSP Iberian Bilbao Terminal (ex Noatum)"], ["CSP Iberian Bilbao Terminal (ex Noatum)", "Portroe Terminal"], ["Portroe Terminal", "Galway City"]]

  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService,
    // private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        for(let leg of this.legs){
          this.http
            .get('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/route/' + leg[0] + '/' + leg[1], {headers})
            .subscribe(response => {
              this.routeInfo = response
              console.log(this.routeInfo);
              this.routeList.push(this.routeInfo);
              this.myLines.push({
                "type": "LineString",
                "coordinates": this.routeInfo.coordinates,
              })
              // this.changeDetector.detectChanges();
              this.getMap();
            });
         }
      });
  }

  getMap() {
    this.map = L.map('map').setView([13.70482, 100.57248], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // L.geoJSON(geojsonFeature, {
    //   style: {
    //     color: 'red',
    //     weight: 5,
    //     opacity: 0.7,
    //     lineCap: 'round'
    //   }
    // }).addTo(this.map);
    var states = [{
      "type": "Feature",
      "properties": {"party": "Republican"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-104.05, 48.99],
          [-97.22,  48.98],
          [-96.58,  45.94],
          [-104.03, 45.94],
          [-104.05, 48.99]
        ]]
      }
    }, {
      "type": "Feature",
      "properties": {"party": "Democrat"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-109.05, 41.00],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.00]
        ]]
      }
    }];


    // @ts-ignore
    L.geoJSON(states, {
      style: function(feature) {
        // @ts-ignore
        switch (feature.properties.party) {
          case 'Republican': return {color: "#ff0000"};
          case 'Democrat':   return {color: "#0000ff"};
          default: return null;
        }
      }
    }).addTo(this.map);


    // console.log(this.routeList)
    // for(let route of this.routeList) {
    //   console.log("hello")
    //   console.log(this.routeList)
    //   myLines.push({
    //     "type": "LineString",
    //     "coordinates": route.coordinates,
    //   })
    // }
    // console.log("mylines", myLines);
//
//     let orig = this.routeInfo.origin
//     console.log(orig)
//     var myLines = [{
//       "type": "LineString",
//       "coordinates": this.routeInfo.coordinates,
//     }];
//     , {
//       "type": "LineString",
//       "coordinates":
//     },
//       {
//         "type": "LineString",
//         "coordinates": ,
//       },
//       {
//         "type": "LineString",
//         "coordinates": ,
//       },
//       {
//         "type": "LineString",
//         "coordinates": ,
//       }
//     ];

    var myStyle = {
      "color": "#ff7800",
      "weight": 5,
      "opacity": 0.65
    };
    console.log(this.myLines)
    // @ts-ignore
    L.geoJSON(this.myLines, {
      style: myStyle
    }).addTo(this.map);
    console.log("finished")


    // const boatIcon = L.icon({
    //   iconUrl: "../../assets/boat-icon.png",
    //   iconSize: [32, 32], // Size of the icon image
    // });
    //
    // const boatMarker = L.marker([35.8617, 104.1954], {
    //   icon: boatIcon,
    // }).addTo(this.map);
    //
    // const routingControl = (<any>L).Routing.control({
    //   waypoints: [
    //     L.latLng(13.65844, 100.54333), // China,
    //     L.latLng(9.077010, 101.735355), // China,
    //     L.latLng(1.269957, 103.796127), // China,
    //   ],
    //   routeWhileDragging: true,
    //   lineOptions: {
    //     styles: [
    //       {color: '#00BFFF', weight: 6}, // Blue line with a weight of 6 pixels
    //     ]
    //   }
    // }); routingControl.addTo(this.map)
  }
}

//
// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import 'leaflet-routing-machine';
// // import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// // import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
// // import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
//
// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent implements OnInit {
//
//   map: L.Map | undefined;
//
//   ngOnInit() {
//     this.map = L.map('map').setView([35.8617, 104.1954], 3);
//     interface MyFeatureCollection extends GeoJSON.FeatureCollection<GeoJSON.LineString> {}
//
//
//     var geojsonFeature: MyFeatureCollection = {
//       'type': 'FeatureCollection',
//       'features': [
//         {
//           'type': 'Feature',
//           'properties': {},
//           'geometry': {
//             'type': 'LineString',
//             'coordinates': [[13.70482, 100.57248],
//               [13.70506, 100.57171],
//               [13.70535, 100.57088],
//               [13.70587, 100.56928],
//               [13.70598, 100.56877],
//               [13.70692, 100.56585],
//               [13.70738, 100.56595],
//               [13.70757, 100.56539],
//               [13.70769, 100.56518],
//               [13.7078, 100.56503],
//               [13.70791, 100.56492],
//               [13.7081, 100.56481],
//               [13.70831, 100.56473],
//               [13.70843, 100.56467],
//               [13.70847, 100.5647],
//               [13.70866, 100.56455],
//               [13.70954, 100.56397],
//               [13.71006, 100.56365],]
//           }
//         }
//       ]
//     };
//
//     // var data = {
//     //   "type": "FeatureCollection",
//     //   "features": [{
//     //     "type": "Feature",
//     //     "geometry": {
//     //       "type": "LineString",
//     //       "coordinates":
//     //     },
//     //     "properties": {
//     //       "color": "red"
//     //     }
//     //   }, {
//     //     "type": "Feature",
//     //     "geometry": {
//     //       "type": "LineString",
//     //       "coordinates": [[0, -45],[0, 45]]
//     //     },
//     //     "properties": {
//     //       "color": "yellow"
//     //     }
//     //   }]
//     // };
//
//     // var geoJsonLayer = L.geoJson(data, {
//     //   onEachFeature: function (feature, layer) {
//     //     if (layer instanceof L.Polyline) {
//     //       layer.setStyle({
//     //         'color': feature.properties.color
//     //       });
//     //     }
//     //   }
//     // });
//
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//
//     L.geoJSON(geojsonFeature).addTo(this.map);
//
//     // L.geoJSON(geojsonFeature).addTo(this.map);
//     //
//     // var myLines = [{
//     //   "type": "LineString",
//     //   "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
//     // }, {
//     //   "type": "LineString",
//     //   "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
//     // }];
//     //
//     // var myStyle = {
//     //   "color": "#ff7800",
//     //   "weight": 5,
//     //   "opacity": 0.65
//     // };
//     //
//     // L.geoJSON(myLines, {
//     //   style: myStyle
//     // }).addTo(map);
//
//       routeWhileDragging: true,
//       lineOptions: {
//         styles: [
//           {color: '#00BFFF', weight: 6}, // Blue line with a weight of 6 pixels
//         ]
//       }
//     }); routingControl.addTo(this.map)
//     // const latlngs = [[38.91,-77.07], [37.77, -79.43], [39.04, -85.2]];
//     // var polyline = L.polyline([[38.91,-77.07], [37.77, -79.43]], {color: 'red'});
//     // polyline.addTo(this.map)
//     //
//     // let polyline = L.polyline(
//     //   coordinates,
//     //   {
//     //     color: 'blue',
//     //     weight: 3,
//     //     opacity: .7,
//     //     lineJoin: 'round'
//     //   }
//     // );
//     // var myLines = [{
//     //   "type": "LineString",
//     //   "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
//     // }, {
//     //   "type": "LineString",
//     //   "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
//     // }];
//     //
//     // var myStyle = {
//     //   "color": "#ff7800",
//     //   "weight": 5,
//     //   "opacity": 0.65
//     // };
//     //
//     // L.geoJSON(myLines, {
//     //   style: myStyle
//     // }).addTo(map);
//   }
// }
