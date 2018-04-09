import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertModule, AlertService } from 'ngx-alerts';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  myForm: FormGroup;
  submitted: false;
  constructor(private fb: FormBuilder, private alertService: AlertService, private toastyService: ToastyService) {
    this.myForm = this.fb.group({
      'whitePaperUpper': ['', Validators.required],
      'whitePaperLower': ['', Validators.required],
      'technical'      : ['', Validators.required],
    });
   }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.myForm);
    this.alertService.success('You have successfully updated the content');
    // this.toastyService.info('dsgdsgdsgdsgdsgsgsgd');
  }

}
