 import { Action } from '@ngrx/store';
import { Pokemon } from '../service/pokemon.model';

 export const ADD_POKEMON = 'ADD_POKEMON';

 export function addPokemonReducer(state: Pokemon, action) {
    switch (action.type) {
      case ADD_POKEMON:
        return [action.payload];
      default:
          return state;
      }
  }