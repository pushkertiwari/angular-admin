import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fadeInOutTranslate } from '../../shared/elements/animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeInOutTranslate]
})
export class ContactComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean;
  editContactIcon = 'icofont-edit';
  editContact = true;
  constructor(private fb: FormBuilder) {
    const name = new FormControl('', Validators.required);
    const email = new FormControl('', [Validators.required, Validators.email]);
    this.myForm = new FormGroup({
      name: name,
      infoEmail: email,
      mediaEmail: email,
    });
  }

  ngOnInit() {
  }
  toggleEditProfile() {
    this.editContactIcon = (this.editContactIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editContact = !this.editContact;
  }
  onSubmit() {
    this.submitted = true
    console.log(this.myForm);
    this.toggleEditProfile();
  }

}
