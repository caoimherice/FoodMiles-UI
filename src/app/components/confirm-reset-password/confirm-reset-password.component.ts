import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css']
})
export class ConfirmResetPasswordComponent {
  loading: boolean;
  user: IUser;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user.email = params['email'];
    });
  }

  public confirmResetPassword(): void {
    this.loading = true;
    this.cognitoService.confirmForgotPassword(this.user.email, this.user.code, this.user.password)
      .then(() => {
        this.router.navigate(['/sign-in']);
      })
      .catch(() => {
        this.loading = false;
      });
  }
}

