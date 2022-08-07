import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  constructor(
    private readonly pokemonService: PokemonService,
  ){}
  
  async executeSeed(){
    const {data}=await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=3');
    data.results.forEach(({name, url})=>{

      const segments =  url.split("/");
      const no:number = +segments?.[6];

      console.log(name, no);
      this.pokemonService.create({no, name});
    
    } )
    return data.results;
  }

}


