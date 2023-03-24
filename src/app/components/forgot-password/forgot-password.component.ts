import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {
  loading: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public resetPassword(): void {
    this.loading = true;
    this.cognitoService.forgotPassword(this.user.email)
      .then(() => {
        this.router.navigate(['/confirmResetPassword'], { queryParams: { email: this.user.email } });
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
