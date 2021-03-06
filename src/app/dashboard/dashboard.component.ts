import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../service/pokemon.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Pokemon[] = [];

  constructor(private service: PokemonService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    this.service.getPokemonList(this.getRandomInt(1, 301)).subscribe((data: any) => {
      this.getPokemons(data);

    })
  }

  getPokemons(data) {
    let pokemonData: Pokemon;
    data.results.forEach(element => {
      this.service.getPokemonByUrl(element.url).subscribe(res => {
        let type: any[] = [];
        res.types.forEach((element: any) => {
          type.push(element.type.name);
        });

        let ability: any[] = [];
        res.abilities.forEach((element: any) => {
          ability.push(element.ability.name);
        });

        pokemonData = {
          alternativeImg: res.sprites.other.dream_world.front_default,
          image: res.sprites.front_default,
          name: res.name,
          type: type.join(' - '),
          height: res.height,
          weight: res.weight,
          id: res.id,
          ability: ability.join(' - ')
        };
        this.data.push(pokemonData);
        localStorage.setItem('pokedet', JSON.stringify(this.data));
      })
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  addPokemon(pokemonData: Pokemon) {
    localStorage.setItem('pokemon', JSON.stringify(pokemonData));
    this.router.navigateByUrl('/pokemon');

  }

  filtrar(e) {
    const pokeDex = localStorage.getItem('pokedet');
    const obj = JSON.parse(pokeDex || "[]");
    this.data = obj;

    this.data = this.data.filter(function (element) {
      return element.name.includes(e.target.value) || element.type.includes(e.target.value);
    });
  }

}
