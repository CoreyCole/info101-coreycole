import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// 3rd party
import { DatepickerModule } from 'angular2-material-datepicker';

// app components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthViewComponent } from './auth-view/auth-view.component';
import { LoginComponent } from './auth-view/login/login.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { MyBumpsViewComponent } from './my-bumps-view/my-bumps-view.component';
import { AddBumpViewComponent } from './add-bump-view/add-bump-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { IssueBumpsComponent } from './admin-view/issue-bumps/issue-bumps.component';

var myFirebaseConfig = {
  apiKey: "AIzaSyDfBdMlXp1JX665bHevgqC-8zeqp938PoI",
  authDomain: "bump-db.firebaseapp.com",
  databaseURL: "https://bump-db.firebaseio.com",
  storageBucket: "bump-db.appspot.com",
  messagingSenderId: "728950712724"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthViewComponent,
    LoginComponent,
    HomeViewComponent,
    MyBumpsViewComponent,
    AddBumpViewComponent,
    AdminViewComponent,
    IssueBumpsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    DatepickerModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
