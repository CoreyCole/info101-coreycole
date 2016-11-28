import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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
    this.http.get('http://localhost:80/api/bumps').subscribe(data => {
      this.students = JSON.parse(data['_body']);
    });
  }

}
