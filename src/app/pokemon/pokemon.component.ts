import { Pokemon } from './../service/pokemon.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon;

  constructor(public activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    if( localStorage.getItem('pokemon')){
      const retrievedObject = localStorage.getItem('pokemon');
      this.pokemon = JSON.parse(retrievedObject);
      localStorage.removeItem('pokemon');
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  
  }

  pokemonDetail(event : Pokemon){
    this.pokemon = event;
  }

}
