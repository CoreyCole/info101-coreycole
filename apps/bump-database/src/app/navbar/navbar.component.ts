import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSidenav } from '@angular/material'
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  @ViewChild('start') start: MdSidenav;
  private loggedIn: boolean;
  private isAdmin: boolean;
  private pageTitle: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.loggedIn = false;
    this.af.auth.subscribe((auth) => {
      if (auth) {
        this.loggedIn = true;
        this.start.close();
        if (auth.uid == 'z65u3DpzK9T5ArO1yMfKDFAKpmZ2') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
        // this.router.navigate(['home']);
      } else {
        this.loggedIn = false;
        this.start.close();
        this.router.navigate(['auth/login']);
      }
    });
  }

  toggleNav() {
    if(this.start._isClosed) {
      this.start.open();
    } else {
      this.start.close();
    }
  }

  logout() {
    this.af.auth.logout();
  }

}
