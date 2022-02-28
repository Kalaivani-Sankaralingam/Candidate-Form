import { SharingDataService } from './../sharing-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  piNextBtnClicked: Boolean = true;
  eduExpNextBtnClicked: Boolean = false;
  workExpNextBtnClicked: Boolean = false;
  piFormData: any = {};
  eduFormData: any = {};
  workFormData: any = {};
  accordionShown: number = 1;
  arrowDirection: String = 'down';
  constructor(private router: Router, private sharedData: SharingDataService) {}

  ngOnInit(): void {
    this.sharedData.setActiveAccordion(1);
  }
  setValue($event: any) {
    this.accordionShown = this.sharedData.getActiveAccordion();
    this.piNextBtnClicked = $event.personal_info;
    if ($event.piFormData != null && $event.piFormData != '') {
      this.piFormData = $event.piFormData;
    }
    this.eduExpNextBtnClicked = $event.edu_exp;
    if ($event.eduFormData != null && $event.eduFormData != '') {
      this.eduFormData = $event.eduFormData;
    }
    this.workExpNextBtnClicked = $event.work_exp;
    if ($event.workFormData != null && $event.workFormData != '') {
      this.workFormData = $event.workFormData;

      this.router.navigate(['/review'], {
        state: {
          formValues: JSON.stringify({
            personalDetails: this.piFormData.value,
            eduDetails: this.eduFormData.value,
            workDetails: this.workFormData.value,
          }),
        },
      });
    }
    console.log('parent ' + this.eduExpNextBtnClicked);
  }
  onHeaderClick(clickedAccordion: number) {
    this.accordionShown = clickedAccordion;
    this.arrowDirection = 'up';
  }
}
