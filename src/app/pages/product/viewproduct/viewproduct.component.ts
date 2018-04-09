import { Component, OnInit } from '@angular/core';
import { Ajax } from '../../../ajax';
import { AlertService } from 'ngx-alerts';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as _ from 'lodash';
@Component({
	selector: 'app-viewproduct',
	templateUrl: './viewproduct.component.html',
	styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
	public loading = false;
	public loading2 = false;
	public loading3 = false;
	public data: any;
	product_id : any;
	private updatePrFrm : FormGroup;
	public editor;
	public editorContent;
	public editorContent2;
	public editorConfig = {
		placeholder: 'Product Description'
	};
	public editorConfig2 = {
		placeholder: 'Terms'
	};
	typeImage: any;
	picturldata: any;
	getData: any;
	private base64textString: String = '';
	constructor(public ajax: Ajax, private alertService: AlertService, private formBuilder: FormBuilder, private router: Router) {
		this.updatePrFrm = this.formBuilder.group({
			'id': [''],
			'description': ['', Validators.required],
			'terms': ['', Validators.required],
			'name': ['', Validators.required],
			'picture': [''],
			'value': ['', Validators.required],
			'isFeatured' : [false],
		}); 
	}

	ngOnInit() {
		this.getProducts();
		setTimeout(() => {
			this.editorContent = this.editorContent;
			console.log('you can use the quill instance object to do something', this.editor);
		}, 2800);
	}

	onEditorBlured(quill) {
	}

	onEditorFocused(quill) {
	}

	onEditorCreated(quill) {
		this.editor = quill;
	}

	onContentChanged({ quill, html, text }) {
	}

	getProducts() {
		this.loading = true;
		let request = this.ajax.get('product').share();
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

	deleteProduct(id) {
		this.product_id = id;
		document.querySelector("#deleteModal").classList.add('md-show');
	}

	closeMyModal(event) {
		((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
	}

	closeDeletePopup() {
		document.querySelector("#deleteModal").classList.remove('md-show');	
	}

	yesDelete(event) {
		this.loading3 = true;
		let data = {
			'id' : this.product_id
		};
		let request = this.ajax.post('product/remove', data).share();
		request.map(response => response.json()).subscribe(response => {
			this.loading3 = false;
			this.alertService.success(response.message);
			this.getProducts();
			document.querySelector("#deleteModal").classList.remove('md-show');
		}, err => {
			this.loading3 = false;
			console.log('Error',err);
			this.alertService.danger('Error');
			document.querySelector("#deleteModal").classList.remove('md-show');
		});
	}

	editProduct(id) {
		this.getData = _.find(this.data, function(o) { return o._id == id;  });
		console.log('id',id, 'this.data',this.data,);
		this.updatePrFrm.get('id').setValue(id);
		this.updatePrFrm.get('name').setValue(this.getData.name);
		//this.updatePrFrm.get('picture').setValue(this.getData.picture);
		this.updatePrFrm.get('value').setValue(this.getData.value);
		this.updatePrFrm.get('terms').setValue(this.getData.terms);
		this.updatePrFrm.get('description').setValue(this.getData.description);
		this.updatePrFrm.get('isFeatured').setValue(this.getData.isFeatured);
		document.querySelector("#productUpdate").classList.add('md-show');
	}

	handleFileSelect(evt){
		const files = evt.target.files;
		const file = files[0];
		this.typeImage = files[0].type;
		if (files && file) {
			const reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	_handleReaderLoaded(readerEvt) {
		const binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
		this.picturldata = this.base64textString;
	}

	updateProduct() {
		this.updatePrFrm.value.picture = 'data:'.concat(this.typeImage, ';base64,', this.picturldata);
		this.loading2 = true;
		let data = {};
		if(this.picturldata == undefined) {
			data =	{ 
				"id": this.updatePrFrm.value.id,
				"params": {
					"name"		: this.updatePrFrm.value.name,
					"value"		: this.updatePrFrm.value.value,
					"terms"		: this.updatePrFrm.value.terms,
					"description": this.updatePrFrm.value.description,
					"isFeatured": this.updatePrFrm.value.isFeatured
				}
			};
		} else {
			data =	{ 
				"id": this.updatePrFrm.value.id,
				"params": {
					"name"		: this.updatePrFrm.value.name,
					"picture"	: this.updatePrFrm.value.picture,
					"value"		: this.updatePrFrm.value.value,
					"terms"		: this.updatePrFrm.value.terms,
					"description": this.updatePrFrm.value.description,
					"isFeatured": this.updatePrFrm.value.isFeatured
				}
			};
		}		
		console.log(data);
		let request = this.ajax.post('product/update', data).share();
		request.map(response => response.json()).subscribe(response => {
			this.loading2 = false;
			console.log('response aa',response);
			this.alertService.success(response.message);
			document.querySelector("#productUpdate").classList.remove('md-show');
			this.getProducts();
		}, err => {
			this.loading2 = false;
			console.log('Error',err);
			this.alertService.danger('Error');
			document.querySelector("#productUpdate").classList.remove('md-show');
		});
	}

}
