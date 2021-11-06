import { Pokemon } from './../service/pokemon.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  @Output() pokemon = new EventEmitter<Pokemon>();
  constructor(readonly service: PokemonService) { }

  ngOnInit(): void {
    this.service.getPokemonsSpecie(3).subscribe(res => {
      //this.helo(res)
      console.log(res)
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
    console.log(evoChain)
  }

}
