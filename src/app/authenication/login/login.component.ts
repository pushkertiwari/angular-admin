import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { Ajax } from '../../ajax';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private login : FormGroup;
  public loading = false;
  constructor(private formBuilder: FormBuilder, public ajax: Ajax, private alertService: AlertService, private router: Router) {
  	this.login = this.formBuilder.group({
  		email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
  		password: ['', Validators.compose([Validators.required])],
  	}); 
  }
  ngOnInit() {
  }

  loginForm() {
    this.loading = true;
    let data = this.login.value;
    let request = this.ajax.post('users/search',data).share();
      request.map(response => response.json()).subscribe(response => {
         this.loading = false;
         if(response.length > 0) {
           this.loading = false;
           this.alertService.success('Successfully logged in');
           localStorage.setItem('currentUser', JSON.stringify(response[0]));
           this.router.navigate(['/dashboard']);
         } else {
           this.alertService.danger("User does not exist");
         }
      }, err => {
        this.loading = false;
        this.alertService.danger(err.json().errmsg);
      });
  }

}
