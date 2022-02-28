import { Authservice } from './../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: Authservice) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
