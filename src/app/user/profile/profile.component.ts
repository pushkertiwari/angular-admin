import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { fadeInOutTranslate } from '../../shared/elements/animation';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbDateParserFormatter, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import '../../../assets/echart/echarts-all.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fadeInOutTranslate]
})
export class ProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';
  profileViewForm: FormGroup;
  modelPopup: NgbDateStruct;
  public minDate: NgbDateStruct;
  date: {year: number, month: number};
  constructor(private fb: FormBuilder, public parserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar) {
    this.profileViewForm = this.fb.group({
      fullname: [''],
      email: [''],
      birth_date: [''],
      martial_status: [''],
      mobile_number: [''],
      skype: [''],
      address: [''],
      twitter: [''],
      site_url: ['']
    });
  }

  ngOnInit() {
      // this.http.get(`assets/data/data.json`)
      //     .subscribe((data) => {
      //         this.data = data.json();
      //     });
      this.minDate = { year: 1979, month: 4, day: 5} ;
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }
  onSubmit() {
    console.log(this.profileViewForm.value.birth_date);
    const ngbDate = this.profileViewForm.value.birth_date;
    // const myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    // console.log(myDate);
    console.log(this.parserFormatter.format(ngbDate));
  }

}
