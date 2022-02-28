import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
})
export class WorkExperienceComponent implements OnInit {
  _counter: number = 1;
  workForm!: FormGroup;
  @Input() piBtnClicked!: any[];
  @Output() passToParent = new EventEmitter<any>();
  constructor(private _formBuilder: FormBuilder) {}
  counter(i: number) {
    console.log('counter' + i);
    return new Array(i);
  }
  ngOnInit(): void {
    this.workForm = this._formBuilder.group({
      workDetails: this._formBuilder.array(
        [this.createFormControls()],
        Validators.required
      ),
    });

    this.workForm.get('workHere')?.valueChanges.subscribe((value) => {
      if (value) {
        this.workForm.get('toDate')?.disable();
      } else {
        this.workForm.get('toDate')?.enable();
      }
    });
  }

  createFormControls(): FormGroup {
    return this._formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      workHere: [''],
      fromDate: ['', Validators.required],
      toDate: [''],
    });
  }

  get workDetails(): FormArray {
    return <FormArray>this.workForm.get('workDetails');
  }

  get jobTitle() {
    return this.workForm.get('jobTitle');
  }
  get companyName() {
    return this.workForm.get('companyName');
  }
  get location() {
    return this.workForm.get('location');
  }
  get description() {
    return this.workForm.get('description');
  }
  get workHere() {
    return this.workForm.get('workHere');
  }
  get fromDate() {
    return this.workForm.get('fromDate');
  }
  get toDate() {
    return this.workForm.get('toDate');
  }

  add() {
    this._counter++;
    this.workDetails.push(this.createFormControls());
  }

  remove(i: any) {
    this._counter--;
    this.workDetails.removeAt(i);
  }

  onSubmit() {
    this.passToParent.emit({ work_exp: true, workFormData: this.workForm });
  }
}
