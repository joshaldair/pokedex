import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../service/pokemon.model';
import { PokemonService } from '../service/pokemon.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon;

  constructor(public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('pokemon');
    this.pokemon = JSON.parse(retrievedObject);
  }

}
