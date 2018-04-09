import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Ajax } from '../../../ajax';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product',
	templateUrl: './addproduct.component.html',
	styleUrls: ['./addproduct.component.css']
})
export class ProductComponent implements OnInit {
	public editor;
	public editorContent;
	public editorContent2;
	public editorConfig = {
		placeholder: 'Product Description'
	};
	public editorConfig2 = {
		placeholder: 'Terms'
	};
	myForm: FormGroup;
	typeImage: any;
	picturldata: any;
	public picture_error = false;
	private base64textString: String = '';
	public loading = false;
	public picture_required = false;

	constructor(private fb: FormBuilder,  public ajax: Ajax, private alertService: AlertService, private router: Router) {
		this.myForm = this.fb.group({
			'description': ['', Validators.required],
			'terms': ['', Validators.required],
			'name': ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9 ]*'), Validators.required])],
			'picture': [''],
			'value': ['', Validators.required],
			'isFeatured' : [false],
		}, { validator: this.checkWhiteSpace('name') }); 
	}

	checkWhiteSpace(name: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let title = group.controls[name];
			if(title.value.trim() == '') {
				return {
					checkWhiteSpace : true
				};
			}
		}
	}

	ngOnInit() {
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

	checkedImage(event) {
		console.log('event', event);
	}

	handleFileSelect(evt){
		const files = evt.target.files;
		const file = files[0];
		if(!file) {
			this.typeImage = undefined;
			this.picture_required = true;
			return;
		} else {
			this.picture_required = false;
		}
		this.typeImage = files[0].type;
		if(this.typeImage.search('jpeg') > 0 || this.typeImage.search('jpg') > 0 || this.typeImage.search('png') > 0 || this.typeImage.search('bmp') > 0) {
			this.picture_error = false;
		} else {
			this.picture_error = true;
		}
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

	onSubmit() {
		if(this.typeImage == undefined) {
			this.picture_required = true;
		} else {
			this.picture_required = false;
			this.myForm.value.picture = 'data:'.concat(this.typeImage, ';base64,', this.picturldata);
			let data = this.myForm.value;
			this.loading = true;
			let request = this.ajax.post('product/create', data).share();
			request.map(response => response.json()).subscribe(response => {
				this.loading = false;
				this.alertService.success(response.message);
				this.myForm.reset();
			}, err => {
				this.loading = false;
				console.log('Error',err);
				this.alertService.danger('Error');
			});
		}
	}

}
