import {Component, OnInit} from '@angular/core';
import { SearchItemComponent} from "../search-item/search-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CognitoService} from "../../cognito.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css'],
  // providers: [SearchItemComponent]
})
export class
DisplayItemComponent implements OnInit{
  // name: any;
  // origin: any;
  // miles: any;
  food:any;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private cognitoService: CognitoService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.food = JSON.parse(params['response']);
      console.log(this.food);
      // do something with this.userId
    });
  }

  addList() {
    var url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/shoppingList/item'
    // let headers;
    this.cognitoService.getSession()
      .then(session => {
        var data = {
          'userId': session.getIdToken().payload['cognito:username'],
          'name': this.food.name,
          'origin': this.food.origin
        }
        console.log("id token", session.getIdToken().payload['cognito:username'])
        console.log('user id', data.userId)
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .post(url, data,{headers})
          .subscribe((response) => {
            this.router.navigate(['shoppingList']);
            console.log(response)
          });
      });
  }
}
