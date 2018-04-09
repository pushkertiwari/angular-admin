import { Component, OnInit } from '@angular/core';
import { Ajax } from '../../ajax';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'ngx-alerts';

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
	public rowsOnPage: Number = 10;
	public loading = false;
	public loading2 = false;
	public data: any;
	private update : FormGroup;
	application_id: any;

	constructor(private formBuilder: FormBuilder, public ajax: Ajax, private alertService: AlertService) {
		this.update = this.formBuilder.group({
			id: [''],
			votingstart: ['', Validators.required],
			votingends: ['', Validators.required],
			winnerannounced: ['', Validators.required],
		}); 
	}

	ngOnInit() {
		this.getApplications();
	}

	getApplications() {
		this.loading = true;
		let request = this.ajax.get('application').share();
		request.map(response => response.json()).subscribe(response => {
			this.loading = false;
			if(response.length) {
				this.data = response;
			} else {
				this.data = [];
			}
		}, err => {
			this.loading = false;
			console.log('Error',err);
		});
	}

	toggleBtn(id,event) {
		if(event) {
			this.update.get('id').setValue(id);
			document.querySelector("#modalUpdate").classList.add('md-show');
		} else {
			console.log('not checked');
		}
	}

	closeMyModal(event) {
		((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
	}

	updateForm(event) {
		this.loading2 = true;
		let request = this.ajax.post('stellar/wallet/create','').share();
		request.map(response => response.json()).subscribe(response => {
			this.loading2 = false;
			let data = {
				'id' 	 : this.update.value.id,
				'params' : {
					'votingstart' 		: this.update.value.votingstart.year+'-'+this.update.value.votingstart.month+'-'+this.update.value.votingstart.day,
					'votingends' 		: this.update.value.votingends.year+'-'+this.update.value.votingends.month+'-'+this.update.value.votingends.day,
					'winnerannounced' 	: this.update.value.winnerannounced.year+'-'+this.update.value.winnerannounced.month+'-'+this.update.value.winnerannounced.day,
					'acceptapplication' : true,
					'wallet.key'    	: response.key,
					'wallet.secret' 	: response.secret,
				},
			};
			let request = this.ajax.post('application/update',data).share();
			request.map(response => response.json()).subscribe(response => {
				this.loading2 = false;
				((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
				this.alertService.success('Succesfully Updated');
				this.getApplications();
			}, err => {
				this.loading2 = false;
				console.log('Error',err);
				this.alertService.danger('Error');
			});
		}, err => {
			this.loading2 = false;
			console.log('Error',err);
			 this.alertService.danger('Error');
		});
		
	}

}
