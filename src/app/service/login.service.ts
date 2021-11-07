import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  trainer: User[] = [];
  constructor(private router: Router) {
  }

  login(user: User): Observable<boolean> {

    const usuario = localStorage.getItem('trainer');
    const obj = JSON.parse(usuario || "[]");
    const filtered = obj.filter(function (element) {
      return user.email === element?.email && user.password === element?.password;
    });

    if (filtered.length > 0) {

      this.user = filtered[0];
      this.user.login = true;
      localStorage.setItem('user', JSON.stringify(this.user));
      return of(true);
    } else {
      return of(false);
    }


  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('pokedet');
    localStorage.removeItem('pokemon');
    this.user = null;
    this.router.navigate(['/login']);
  }

  register(user: User) {
    this.trainer.push(user);
    localStorage.setItem('trainer', JSON.stringify(this.trainer));
    this.router.navigateByUrl('/login');
  }

  update(user: User): Observable<boolean> {
    const entrenadores = localStorage.getItem('trainer');
    const obj = JSON.parse(entrenadores || "[]");
    this.trainer = obj;

    const objIndex = obj.findIndex(function (element) {
      return user.email === element?.email;
    });

    this.trainer[objIndex] = user;
    this.user = user;
    this.user.login = true;
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.removeItem('trainer');
    localStorage.setItem('trainer', JSON.stringify(this.trainer));
    return of(true);
  }

}
