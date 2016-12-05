import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

// app
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loggedIn: boolean;

  constructor(
    public http: Http,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.loggedIn = true;
        var body = {
          uid: auth.uid,
          displayName: auth.facebook.displayName,
          email: auth.facebook.email,
          facebookUid: auth.facebook.uid
        }
        if (!body.displayName || !body.email || !body.facebookUid) {
          location.reload();
        }
        console.log(auth.facebook);
        console.log(body);
        this.http.post(environment.apiUrl + '/api/students', body).subscribe(res => {
          console.log(res);
        });
      } else {
        this.loggedIn = false;
      }
    });
  }

  facebookLogin() {
    this.af.auth.login();
  }
}
