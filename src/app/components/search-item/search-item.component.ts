import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  errorMessage = '';
  suggestions = '';
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
    this.errorMessage = "";
    const url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/route/' + this.searchItemForm.get('name')?.value + '/'+this.searchItemForm.get('origin')?.value;
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        this.http
          .get(url, {headers})
          .subscribe((response: any) => {
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
          },
          (error: any) => {
            console.log("Error:", error);
            const errorData = error.error;
            if ('suggestions' in errorData) {
              this.errorMessage = 'Could not find food item with provided name and origin.';
              console.log('Suggestions:', errorData.suggestions);
              this.suggestions = errorData.suggestions.map((suggestion: { name: any; origin: any; }) => `${suggestion.name} from ${suggestion.origin}`).join(', ');
            } else if ('error' in errorData) {
              this.errorMessage = errorData.error;
            } else {
              console.error('Unexpected error object structure:', error.error);
            }
          });
      });
  }
}

