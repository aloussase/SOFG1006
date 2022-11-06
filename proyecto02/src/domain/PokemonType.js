import * as _ from "lodash";

import IllegalArgumentException from "./common/IllegalArgumentException.js";

class PokemonType {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return this.type;
  }
}

const types = [
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
  "fairy",
];

export default function createType(type) {
  if (!_.isString(type) || _.isEmpty(type)) {
    throw new IllegalArgumentException(
      `Invalid type, expected a non-emtpy string but got: ${type}`
    );
  }

  if (!_.some(types, _.partial(_.eq, type))) {
    throw new IllegalArgumentException(`Invalid type: ${type}`);
  }

  return Object.freeze(new PokemonType(type));
}
