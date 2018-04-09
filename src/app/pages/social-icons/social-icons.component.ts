import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../CustomValidators';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.css']
})
export class SocialIconsComponent implements OnInit {

  myForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'fbLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'twitterLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'teleLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'linkedinLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'instaLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'redditLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'youtubeLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
      'bitLink': ['', [Validators.required, CustomValidators.ValidateUrl]],
    });
   }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.myForm);
    if (this.myForm.valid) {
      //alert('ahh laih chakk');
      console.log(this.myForm.value);
    }
  }
}
