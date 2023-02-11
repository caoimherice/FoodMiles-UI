import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "../../cognito.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  items: any[] = [];
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private cognitoService: CognitoService) {
  }

  ngOnInit() {
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .get('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/shoppingList/details/'+ session.getIdToken().payload['cognito:username'], {headers})
          .subscribe((response: Object) => {
            this.items = response as any[];
          });
      });
  }
}
