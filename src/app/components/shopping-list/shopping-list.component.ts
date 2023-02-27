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
  totalMiles: any;
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
            const items= response[0];
            const totalMiles= response[1];
            console.log(items);
            console.log(totalMiles);
            this.items = items;
            this.totalMiles = totalMiles;
            this.changeDetector.detectChanges();
          });
      });
  }
  saveList() {
    var url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/savedList/list'
    // let headers;
    this.cognitoService.getSession()
      .then(session => {
        var data = {
          'userId': session.getIdToken().payload['cognito:username'],
          'items': this.items
        }
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
