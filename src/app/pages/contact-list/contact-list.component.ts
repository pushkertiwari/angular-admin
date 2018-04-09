import { Component, OnInit, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Ajax } from '../../ajax';


@Component({
	selector: 'app-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	public data: any;
	public rowsOnPage: Number = 10;
	public filterQuery: String = '';
	public sortBy: String = '';
	public sortOrder: String = 'desc';
	public loading = false;
	constructor(public http: Http, public ajax: Ajax) { }

	ngOnInit() {
		/*this.http.get(`assets/data/data.json`)
		.subscribe((data) => {
			this.data = data.json();
			console.log(this.data);
		});*/
		this.getContactList();
	}

	getContactList() {
		this.loading = true;
		let request = this.ajax.get('contact').share();
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

}
