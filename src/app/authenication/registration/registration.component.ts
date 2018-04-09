import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ajax } from '../../ajax';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private register : FormGroup;
  public loading = false;
  constructor(private formBuilder: FormBuilder,public ajax: Ajax, private alertService: AlertService, private router: Router) { 
  	this.register = this.formBuilder.group({
  		username : ['',Validators.required],
  		email: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
  		password: ['', Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(12)])],
  		confirm_password: ['', Validators.required],
  		terms : ['', Validators.required],
  		newsletter : [''],
  	}, { validator: this.matchingPasswords('password', 'confirm_password') });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  	return (group: FormGroup): { [key: string]: any } => {
  		let password = group.controls[passwordKey];
  		let confirmPassword = group.controls[confirmPasswordKey];

  		if (password.value !== confirmPassword.value) {
  			return {
  				mismatchedPasswords: true
  			};
  		}
  	}
  }

  ngOnInit() {
  }

  registerForm() {
  	this.loading = true;
  	if(this.register.value.newsletter == true) {
  		let data = {'email' : this.register.value.email };
  		console.log('data', data);
  		let request = this.ajax.post('subscriber/create',data).share();
  		request.map(response => response.json()).subscribe(response => {
  			this.loading = false;
  			this.alertService.success(response.message);
  			console.log('request subscribe', response);
  		}, err => {
  			this.alertService.danger("User already exist");
  		});
  	}
  	if(this.register.value.terms == true) {
  		let data = this.register.value;
  		let request = this.ajax.post('users/create',data).share();
  		request.map(response => response.json()).subscribe(response => {
  			 this.loading = false;
  			 this.alertService.success(response.message);
  			 this.router.navigate(['/login']);
  		}, err => {
  			this.loading = false;
  			this.alertService.danger(err.json().errmsg);
  		});
  	}	
  }

}
