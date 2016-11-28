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
    this.bumps = this.http.get('http://ec2-34-193-24-15.compute-1.amazonaws.com/api/bumps/requested').map(data => data.json());
  }

  issue(bumpId: number) {
    this.http.post('http://ec2-34-193-24-15.compute-1.amazonaws.com/api/bumps/issue/', { bumpId: bumpId.toString() }).subscribe(res => {
      console.log(res);
    });
  }

  delete(bumpId: number) {
    this.http.delete('http://ec2-34-193-24-15.compute-1.amazonaws.com/api/bumps/delete/' + bumpId).subscribe(res => {
      console.log(res);
    });
  }
}
