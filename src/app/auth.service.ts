import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {}

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['/homePage']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
