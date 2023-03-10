import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  items: any;
  totalDistance: any;
  totalEmissions: any;
  totalLeadTime: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .get('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/shoppingList/details/' + session.getIdToken().payload['cognito:username'], {headers})
          .subscribe((response: any) => {
            this.items = response[0];
            this.totalDistance = response[1];
            this.totalEmissions = response[2];
            this.totalLeadTime = response[3];
            this.changeDetector.detectChanges();
          });
      });
  }
  saveList() {
    console.log("saving list")
    var url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/savedList/list'
    // let headers;
    this.cognitoService.getSession()
      .then(session => {
        var data = {
          'userId': session.getIdToken().payload['cognito:username'],
          'items': this.items
        }
        console.log(this.items)
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .post(url, data,{headers})
          .subscribe((response) => {
            // this.router.navigate(['shoppingList']);
            console.log(response)
          });
      });
  }
}
