import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';

  constructor(readonly service: LoginService,
    private router: Router) { service.user = JSON.parse(localStorage.getItem('user')) }

  onLogout() {
    /*localStorage.removeItem('user');
    this.router.navigate(['/login']);*/
    this.service.logout();
  }
}
