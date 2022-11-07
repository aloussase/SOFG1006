import * as _ from "lodash";

import { PKMN_TOTAL } from "./common/constants.js";
import IllegalArgumentException from "./common/IllegalArgumentException.js";

class PokemonId {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return this.id;
  }
}

export default function createId(id) {
  if (!_.isNumber(id) || id <= 0 || id > PKMN_TOTAL) {
    throw new IllegalArgumentException(`Invalid pokemon id: ${id}`);
  }

  return Object.freeze(new PokemonId(id));
}
