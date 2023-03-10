import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent {
  searchItemForm = new FormGroup({
    name: new FormControl(''),
    origin: new FormControl(''),
  });

  routeInfo: any;
  totalDistance: any;
  totalEmissions: any;
  points: any;
  totalLeadTime: any;
  name: any;
  origin: any;
  isFormSubmitted = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  onSubmit() {
    const url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/route/' + this.searchItemForm.get('name')?.value + '/'+this.searchItemForm.get('origin')?.value;
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        this.http
          .get(url, {headers})
          .subscribe((response: any) => {
            // this.router.navigate(['displayItem',JSON.stringify(response)]);
            console.log("food info")
            console.log(response)
            this.routeInfo = response[0];
            this.totalDistance = response[1];
            this.totalEmissions = response[2];
            this.totalLeadTime = response[3];
            this.points = response[4];
            this.name = response[5];
            this.origin = response[6];
            this.isFormSubmitted = true;
          });
      });
  }
}

