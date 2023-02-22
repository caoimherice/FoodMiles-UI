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

  foodInfo: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  onSubmit() {
    const url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/food/item/' + this.searchItemForm.get('name')?.value + '/'+this.searchItemForm.get('origin')?.value;

    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        this.http
          .get(url, {headers})
          .subscribe(response => {
            // this.router.navigate(['displayItem',JSON.stringify(response)]);
            this.foodInfo = response;
          });
      });
  }
}

