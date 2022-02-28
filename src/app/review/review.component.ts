import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  data: any = {};
  routeState: any;
  submitted: boolean = false;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router?.getCurrentNavigation()?.extras.state;
      if (this.routeState) {
        this.data = this.routeState.formValues
          ? JSON.parse(this.routeState.formValues)
          : '';
      }
    }
  }

  onSubmit() {
    this.submitted = true;
  }
}
