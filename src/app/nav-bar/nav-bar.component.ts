import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(readonly service: LoginService ) { }

  ngOnInit(): void {
    this.service.user = JSON.parse(localStorage.getItem('user')) 
  }

  onLogout() {
    this.service.logout();
  }
}
