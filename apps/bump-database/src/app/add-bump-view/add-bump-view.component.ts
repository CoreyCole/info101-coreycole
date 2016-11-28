import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-bump-view',
  templateUrl: './add-bump-view.component.html',
  styleUrls: ['./add-bump-view.component.sass']
})
export class AddBumpViewComponent implements OnInit {
  public bumpForm: FormGroup;
  public bumpDate: any;
  public bumps: Observable<any>;
  public uid: string;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.bumpForm = this.formBuilder.group({
      amount: ['', Validators.required],
      forWhat: ['', Validators.required]
    });
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.bumps = this.http.get('http://ec2-34-193-24-15.compute-1.amazonaws.com/api/bumps/uid/' + this.uid).map(data => data.json());
      }
    });
    
  }

  requestBump(formValue: any) {
    let d: string = this.bumpDate.toLocaleString();
    let data = {
      uid: this.uid,
      expAmount: parseInt(formValue.amount),
      whatDay: d.slice(0, d.indexOf(',')),
      forWhat: formValue.forWhat,
    };
    console.log(data);
    if (data.uid && data.expAmount && data.whatDay && data.forWhat) {
    this.http.post('http://ec2-34-193-24-15.compute-1.amazonaws.com/api/bumps', data).subscribe(res => {
      console.log(res);
      location.reload();
    });
    } else {
      this.error = 'invalid input';
    }
  }
}
