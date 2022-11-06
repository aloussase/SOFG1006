import PokemonApiService from "./infrastructure/PokemonApiService";

const service = new PokemonApiService();

const pkmn = await service.findAll();

console.log(pkmn);
