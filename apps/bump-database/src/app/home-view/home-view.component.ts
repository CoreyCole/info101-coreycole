import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// app
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.sass']
})
export class HomeViewComponent implements OnInit {
  public students: any[];

  constructor(
    public http: Http
  ) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/api/bumps').subscribe(data => {
      this.students = JSON.parse(data['_body']);
    });
  }

}
