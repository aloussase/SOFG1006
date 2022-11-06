import * as _ from "lodash";

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
  if (!_.isNumber(id) || id <= 0 || id > 905) {
    throw new IllegalArgumentException(`Invalid pokemon id: ${id}`);
  }

  return new PokemonId(id);
}
