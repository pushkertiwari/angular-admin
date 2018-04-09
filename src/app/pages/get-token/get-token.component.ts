import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Ajax } from '../../ajax';


@Component({
	selector: 'app-get-token',
	templateUrl: './get-token.component.html',
	styleUrls: ['./get-token.component.css']
})
export class GetTokenComponent implements OnInit {
	public data: any;
	public rowsOnPage: Number = 10;
	public filterQuery: String = '';
	public sortBy: String = '';
	public sortOrder: String = 'desc';
	public loading = false;
	
	constructor(public http: Http,public ajax: Ajax) { }

	ngOnInit() {
		this.getTokens();
		/*this.http.get(`assets/data/crm-contact.json`)
	    .subscribe((data) => {
	      this.data = data.json();
	      console.log(this.data);
	    });*/
	}

	getTokens() {
		this.loading = true;
		let request = this.ajax.get('airdrop').share();
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


