import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

// app
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-bumps-view',
  templateUrl: './my-bumps-view.component.html',
  styleUrls: ['./my-bumps-view.component.sass']
})
export class MyBumpsViewComponent implements OnInit {
  public bumps: Observable<any>;
  public uid: string;
  public totalRequested: number = 0;
  public totalIssued: number = 0;

  constructor(
    private http: Http,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.bumps = this.http.get(environment.apiUrl + '/api/bumps/uid/' + this.uid).map(data => data.json());
        this.bumps.forEach(data => {
          console.log(data);
          if (data.expAmount)
            this.totalRequested += data.expAmount;
          if (data.amountIssued)
            this.totalIssued += data.amountIssued;
        });
        console.log(this.totalRequested + " : " + this.totalIssued);
      }
    });
  }

}
