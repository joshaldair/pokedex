import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  constructor(private router: Router) {
  }

  login(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
 
}
