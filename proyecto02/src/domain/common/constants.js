import * as immutable from "immutable";

// The current number of existing pokemon.
export const PKMN_TOTAL = 905;

// Current existing pokemon types.
export const PKMN_TYPES = immutable.List.of(
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy"
);

export const STAT_NAMES = immutable.List.of(
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed"
);
