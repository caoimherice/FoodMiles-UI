import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { DisplayItemComponent } from './components/display-item/display-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { SavedListComponent } from './components/saved-list/saved-list.component';
import { SavedListRowDetailsComponent } from './components/saved-list-row-details/saved-list-row-details.component';
import { MapComponent } from './components/map/map.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { DayHourMinutePipe } from './day-hour-minute.pipe';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/confirm-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    SearchItemComponent,
    DisplayItemComponent,
    ShoppingListComponent,
    SavedListComponent,
    MapComponent,
    SavedListRowDetailsComponent,
    RouteDetailsComponent,
    DayHourMinutePipe,
    ForgotPasswordComponent,
    ConfirmResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {

}
