import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage = '';
  loading: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/searchItem']);
        this.cognitoService.getSession()
          .then(session => {
            console.log(session.getAccessToken());
          })
      }).catch( error => {
        console.error(error)
        this.loading = false;
        if (error.code === 'NotAuthorizedException') {
          this.errorMessage = 'Invalid email or password. Please try again.';
          // alert('Invalid email or password. Please try again.');
        } else {
          // display a generic error message for other types of errors
          alert('An error occurred while signing in. Please try again later.');
        }
    });
  }

  public forgotPassword(): void {
    this.router.navigate(['/forgotPassword']);
  }
}
