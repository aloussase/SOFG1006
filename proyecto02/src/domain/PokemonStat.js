import * as _ from "lodash";

import { STAT_NAMES } from "./common/constants.js";

import IllegalArgumentException from "./common/IllegalArgumentException.js";

class PokemonStat {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  toString() {
    return `PokemonStat{name=${this.name}, value=${this.value}}`;
  }
}

export default function createStat(name, value) {
  if (!STAT_NAMES.some((stat) => stat === name)) {
    throw new IllegalArgumentException(`Invalid stat name: ${name}`);
  }

  if (!_.isNumber(value)) {
    throw new IllegalArgumentException(
      `Invalid value for stat ${name}, expected a number but got: ${value}`
    );
  }

  if (value < 0) {
    throw new IllegalArgumentException(
      `Invalid value for stat ${name}, expected greater than zero but got: ${value}`
    );
  }

  return Object.freeze(new PokemonStat(name, value));
}
