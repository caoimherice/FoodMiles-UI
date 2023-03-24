import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.css']
})
export class SavedListComponent implements OnInit {
  items: any;
  createdAtList: any[] = [];
  totalDistanceList: any[] = [];
  totalEmissionsList: any[] = [];
  totalLeadTimeList: any[] = [];
  listDetails: any[] = [];
  activeRow: number | null = 0;
  distanceTrendList: string[] = ['same'];
  emissionsTrendList: string[] = ['same'];
  leadTimeTrendList: string[] = ['same'];

  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getSavedList();
  }

  getSavedList() {
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .get('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/savedList/list/' + session.getIdToken().payload['cognito:username'], {headers})
          .subscribe((response: Object) => {
            this.items = response as any[];
            for (let item of this.items){
              this.createdAtList.push(item.createdAt)
              this.totalDistanceList.push(item.total_distance)
              this.totalEmissionsList.push(item.total_emissions)
              this.totalLeadTimeList.push(item.total_lead_time)
              this.listDetails.push(item.items_list)
              console.log(this.createdAtList)
              console.log(this.listDetails)
            }
            this.changeDetector.detectChanges();
            for (let i = 1; i < this.items.length; i++) {
              this.distanceTrendList.push(this.totalDistanceList[i] > this.totalDistanceList[i - 1] ? 'up' : this.totalDistanceList[i] < this.totalDistanceList[i - 1] ? 'down' : 'same');
              this.emissionsTrendList.push(this.totalEmissionsList[i] > this.totalEmissionsList[i - 1] ? 'up' : this.totalEmissionsList[i] < this.totalEmissionsList[i - 1] ? 'down' : 'same');
              this.leadTimeTrendList.push(this.totalLeadTimeList[i] > this.totalLeadTimeList[i - 1] ? 'up' : this.totalLeadTimeList[i] < this.totalLeadTimeList[i - 1] ? 'down' : 'same');
            }
          });
      });
  }

  showDetails(i: number) {
    this.activeRow = i;
  }

  hideDetails() {
    this.activeRow = null;
  }

}

