import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class CognitoService {
  // boolean behaviour subject to hold users authentication status
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor() {
    Amplify.configure({
      Auth: {
        userPoolId: 'us-east-1_NgROfraZ8',
        userPoolWebClientId: '2t074nmv3q25uhg2cnq1rd602q',
      }
    });
    this.updateAuthentication();
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        // @ts-ignore
        this.updateAuthentication();
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        // @ts-ignore
        this.updateAuthentication();
      });
  }

  // updates users authentication status
  public updateAuthentication(): void {
    // currentUserInfo returns a promise, true if logged in, otherwise false
    // @ts-ignore
   Auth.currentUserInfo()
     // setting isAuthenticated$ to true if logged in
     .then(user => this.isAuthenticated$.next(!!user))
     // if not logged in setting isAuthenticated$ to false
     .catch(() => this.isAuthenticated$.next(false));
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getSession(): Promise<CognitoUserSession> {
    return Auth.currentSession()
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  public forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  public confirmForgotPassword(email: string, code: string, newPassword: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, newPassword);
  }
}
