import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = 'https://pokeapi.co/api/v2';
  

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number) {
    return this.http.get(`${this.baseUrl}/pokemon?limit=50&offset=${offset}`);
  }

  getPokemonByUrl(url: string) {
    return this.http.get<any>(url);
  }

  getPokemons(id) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${id}`);
  }

  getPokemonsEvolution(id) {
    return this.http.get<any>(`${this.baseUrl}/evolution-chain/${id}`);
  }

  getPokemonsSpecie(id) {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`);
  }

}
