import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ElementRef, Directive, Renderer2} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CognitoService } from "../../cognito.service";
declare var $: any;
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/js/bootstrap.bundle';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.css']
})
export class SavedListComponent implements OnInit, AfterViewInit {
  items: any;
  createdAtList: any[] = [];
  listDetails: any[] = [];
  activeRow: number | null = 0;
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getSavedList();
  }

  ngAfterViewInit() {
    $(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
  }

  getSavedList() {
    this.cognitoService.getSession()
      .then(session => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .get('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/savedList/list/' + session.getIdToken().payload['cognito:username'], {headers})
          .subscribe((response: Object) => {
            console.log("hello")
            this.items = response as any[];
            for (let item of this.items){
              console.log("hello2")
              this.createdAtList.push(item.createdAt)
              this.listDetails.push(item.items_list)
              console.log(this.createdAtList)
              console.log(this.listDetails)
            }
            this.changeDetector.detectChanges();
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

