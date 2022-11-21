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

export const PKMN_TYPE_COLORS = {
  bug: "olivedrab",
  dark: "black",
  dragon: "royalblue",
  electric: "yellow",
  fairy: "pink",
  fighting: "red",
  fire: "orange",
  flying: "cornflowerblue",
  ghost: "purple",
  grass: "green",
  ground: "burlywood",
  ice: "silver",
  normal: "lightsteelblue",
  poison: "purple",
  psychic: "fuchsia",
  rock: "brown",
  steel: "slategrey",
  water: "aqua",
};

export const STAT_NAMES = immutable.List.of(
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed"
);
