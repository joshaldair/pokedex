import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPokemonList(offset : number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
  }
}
