import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-issue-bumps',
  templateUrl: './issue-bumps.component.html',
  styleUrls: ['./issue-bumps.component.sass']
})
export class IssueBumpsComponent implements OnInit {
  public bumps: Observable<any>;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.bumps = this.http.get('http://localhost:80/api/bumps/requested').map(data => data.json());
  }

  issue(bumpId: number) {
    this.http.post('http://localhost:80/api/bumps/issue/', { bumpId: bumpId.toString() }).subscribe(res => {
      console.log(res);
    });
  }

  delete(bumpId: number) {
    this.http.delete('http://localhost:80/api/bumps/delete/' + bumpId).subscribe(res => {
      console.log(res);
    });
  }
}
