import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharingDataService } from '../sharing-data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  _counter: number = 1;
  eduForm!: FormGroup;
  // eduExpNextBtn: Boolean = false;
  notValid: Boolean = false;
  touched: Boolean = false;
  @Input() piBtnClicked!: any[];
  @Output() passToParent = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private sharedData: SharingDataService
  ) {}
  counter(i: number) {
    console.log('counter' + i);
    return new Array(i);
  }
  ngOnInit(): void {
    this.eduForm = this._formBuilder.group({
      eduDetails: this._formBuilder.array(
        [this.createFormControls()],
        Validators.required
      ),
      // collegeName: ['', Validators.required],
      // degree: ['', Validators.required],
      // subject: ['', ],
      // result: ['', ],
      // fromDate: ['', ],
      // toDate: ['', ],
      // tickets:this._formBuilder.array([this.createTicket()],Validators.required)
    });
  }

  get collegeName() {
    return this.eduForm.get('collegeName');
  }
  get degree() {
    return this.eduForm.get('degree');
  }
  get subject() {
    return this.eduForm.get('subject');
  }
  get result() {
    return this.eduForm.get('result');
  }
  get fromDate() {
    return this.eduForm.get('fromDate');
  }
  get toDate() {
    return this.eduForm.get('toDate');
  }

  add() {
    //this._counter++;
    this._counter++;
    this.eduDetails.push(this.createFormControls());
  }

  get eduDetails(): FormArray {
    return <FormArray>this.eduForm.get('eduDetails');
  }

  remove(i: any) {
    this._counter--;
    this.eduDetails.removeAt(i);
  }

  onSubmit() {
    // this.eduExpNextBtn = true;

    this.sharedData.setActiveAccordion(3);
    this.passToParent.emit({ work_exp: true, eduFormData: this.eduForm });
  }

  createFormControls(): FormGroup {
    return this._formBuilder.group({
      collegeName: ['', Validators.required],
      degree: ['', Validators.required],
      subject: ['', Validators.required],
      result: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }
}
