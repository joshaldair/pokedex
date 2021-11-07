import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  constructor(private router: Router) {
  }

  login(user: User): Observable<boolean> {

    const usuario = localStorage.getItem('user');
    const obj = JSON.parse(usuario);
    if (user.email === obj?.email && user.password === obj?.password) {
      this.user = user;
      this.user.login = true;
      localStorage.setItem('user', JSON.stringify(user));
      return of(true);
    } else {
      return of(false);
    }


  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }

  register(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('/login');
  }

}