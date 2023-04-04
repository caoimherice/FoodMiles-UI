import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  errorMessage = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    console.log("signing up");
    this.cognitoService.signUp(this.user)
      .then(() => {
        this.loading = false;
        // setting isConfirm to true which will display the next form to validate the users account
        this.isConfirm = true;
      })
      .catch((err) => {
        this.loading = false;
        // catching any exceptions thrown by signUp in CognitoService
        if (err.code === "InvalidParameterException") {
          if (err.message.includes("email")) {
            // setting errorMessage to the appropriate error to be shown to user
            this.errorMessage = "Invalid email format.";
          } else if (err.message.includes("password")) {
            this.errorMessage = "Invalid password format.";
          }
        } else {
          this.errorMessage = err.message;
        }
      });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/signIn']);
      }).catch(() => {
      this.loading = false;
    });
  }
}
