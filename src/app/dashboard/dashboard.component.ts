import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getPokemonList(this.getRandomInt(1, 201)).subscribe((data: any) => {
      console.log(data.results)
    })
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onLogout() {

    this.router.navigate(['/user/login']);
  }
}
