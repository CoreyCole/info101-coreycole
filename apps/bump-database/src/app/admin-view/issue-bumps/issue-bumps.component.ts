import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// app
import { environment } from '../../../environments/environment';

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
    this.bumps = this.http.get(environment.apiUrl + '/api/bumps/requested').map(data => data.json());
    this.bumps.subscribe(data => {
      console.dir(data);
    });
  }

  issue(bumpId: number, amountIssued: number) {
    // console.log(bumpId, amountIssued);
    this.http.post(environment.apiUrl + '/api/bumps/issue/',
      { bumpId: bumpId.toString(), amountIssued: amountIssued }).subscribe(res => {
        console.log(res);
      });
  }

  delete(bumpId: number) {
    this.http.delete(environment.apiUrl + '/api/bumps/delete/' + bumpId).subscribe(res => {
      console.log(res);
    });
  }
}
