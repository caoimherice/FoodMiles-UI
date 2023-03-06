import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './cognito.service';
import {Observable} from "rxjs/";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodMiles-UI';
  public isAuthenticated$: Observable<boolean> = this.cognitoService.isAuthenticated$;

  constructor(
    private router: Router,
    private cognitoService: CognitoService
  ) { }

  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/signIn']);
      });
  }

}
