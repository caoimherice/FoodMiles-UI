import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SearchItemComponent } from "./components/search-item/search-item.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { SavedListComponent } from "./components/saved-list/saved-list.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/confirm-reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'confirmResetPassword',
    component: ConfirmResetPasswordComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'searchItem',
    component: SearchItemComponent,
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  },
  {
    path: 'savedList',
    component: SavedListComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
