import * as _ from "lodash";
import { PKMN_TYPES } from "./common/constants.js";

import IllegalArgumentException from "./common/IllegalArgumentException.js";

class PokemonType {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return this.type;
  }
}

export default function createType(type) {
  if (!_.isString(type) || _.isEmpty(type)) {
    throw new IllegalArgumentException(
      `Invalid type, expected a non-emtpy string but got: ${type}`
    );
  }

  if (!PKMN_TYPES.some(_.partial(_.isEqual, type))) {
    throw new IllegalArgumentException(`Invalid type: "${type}"`);
  }

  return Object.freeze(new PokemonType(type));
}
