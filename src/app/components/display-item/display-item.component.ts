import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CognitoService } from "../../cognito.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
})

export class DisplayItemComponent {
  @Input()
  totalDistance: any;
  @Input()
  totalEmissions: any;
  @Input()
  totalLeadTime: any;
  @Input()
  name: any;
  @Input()
  origin: any;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private cognitoService: CognitoService) {
  }

  addList() {
    var url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/shoppingList/item'
    this.cognitoService.getSession()
      .then(session => {
        var data = {
          'userId': session.getIdToken().payload['cognito:username'],
          'name': this.name.name,
          'origin': this.origin.origin
        }
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        this.http
          .post(url, data,{headers})
          .subscribe((response) => {
            console.log(response)
            this.router.navigate(['shoppingList']);
          });
      });
  }
}
