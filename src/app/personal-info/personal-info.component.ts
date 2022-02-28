import { SharingDataService } from '../sharing-data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  piForm!: FormGroup;
  piNextBtnClicked!: Boolean;
  @Output() passToParent = new EventEmitter<any>();
  titleArray = ['Doctor', 'Mr', 'Mrs', 'Miss'];
  countryCodeArray = [
    'Canada (+1)',
    'India (+91)',
    'United Kingdom (+44)',
    'United States of America (+1)',
  ];
  CountyArray = ['Cardiff', 'Cornwall', 'Essex', 'Kent'];
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private sharedData: SharingDataService
  ) {}

  ngOnInit(): void {
    this.piNextBtnClicked = false;
    this.piForm = this._formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressLine3: [''],
      county: [''],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      countryCode: ['', Validators.required],
    });
    this.sharedData.setData(1);
  }

  get title() {
    return this.piForm.get('title');
  }
  get firstName() {
    return this.piForm.get('firstName');
  }
  get lastName() {
    return this.piForm.get('lastName');
  }
  get email() {
    return this.piForm.get('email');
  }
  get phoneNumber() {
    return this.piForm.get('phoneNumber');
  }
  get addressLine1() {
    return this.piForm.get('addressLine1');
  }
  get addressLine2() {
    return this.piForm.get('addressLine2');
  }
  get addressLine3() {
    return this.piForm.get('addressLine3');
  }
  get city() {
    return this.piForm.get('city');
  }
  get county() {
    return this.piForm.get('county');
  }
  get postCode() {
    return this.piForm.get('postCode');
  }
  get countryCode() {
    return this.piForm.get('countryCode');
  }

  onSubmit() {
    if (this.piForm.valid) {
      this.piNextBtnClicked = false;
      console.log('form submitted');
      this.sharedData.setActiveAccordion(2);
      this.passToParent.emit({ edu_exp: true, piFormData: this.piForm });
    } else {
      this.validateAllFormFields(this.piForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
