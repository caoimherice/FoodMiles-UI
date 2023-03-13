import {ChangeDetectorRef, Component, Input, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CognitoService} from "../../cognito.service";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent {
  @Input()
  routeInfo: any;
  // constructor(
  //   private changeDetector: ChangeDetectorRef
  // ) { }

  // ngOnChanges(changes: SimpleChanges) {
  //   // detect changes and reload the map
  //   this.changeDetector.detectChanges();
  //   this.getMap();
  // }
}
