import PokemonApiService from "./infrastructure/PokemonApiService.js";

const service = new PokemonApiService();

const pkmn = await service.findAll();

console.log(pkmn);
