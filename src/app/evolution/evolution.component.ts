import { Pokemon } from '../model/pokemon.model';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  data: any[] = [];
  @Output() pokemon = new EventEmitter<Pokemon>();
  @Input() id : number;
  constructor(readonly service: PokemonService) { }

  ngOnInit(): void {
    this.service.getPokemonsSpecie(this.id).subscribe(res => {
      this.service.getPokemonByUrl(res.evolution_chain.url).subscribe(data => {
        this.evolutionArray(data)
      })
    })
  }

  pokemonDetail(value: Pokemon) {
    this.pokemon.emit(value);
  }

  evolutionArray(response) {
    var evoChain = [];
    var evoData = response.chain;

    do {
      var evoDetails = evoData['evolution_details'][0];

      evoChain.push({
        "species_name": evoData.species.name,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "item": !evoDetails ? null : evoDetails.item
      });

      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    this.getPokemons(evoChain);
  }


  getPokemons(data) {
    let pokemonData: Pokemon;
    data.forEach(element => {
      this.service.getPokemons(element.species_name).subscribe(res => {
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
      })
    });
  }
}
