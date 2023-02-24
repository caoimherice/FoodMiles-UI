import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TooltipDirective } from './tooltip.directive';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { DisplayItemComponent } from './components/display-item/display-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { SavedListComponent } from './components/saved-list/saved-list.component';
import { SavedListRowDetailsComponent } from './components/saved-list-row-details/saved-list-row-details.component';

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
    TooltipDirective,
    SavedListRowDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
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
