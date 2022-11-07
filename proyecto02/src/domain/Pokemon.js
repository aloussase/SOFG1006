import * as _ from "lodash";
import * as immutable from "immutable";

import IllegalArgumentException from "./common/IllegalArgumentException.js";
import createNonEmptyString from "./common/NonEmptyString.js";
import createId from "./PokemonId.js";
import createStat from "./PokemonStat.js";
import createType from "./PokemonType.js";

class Pokemon {
  constructor(
    id,
    species,
    types,
    imageUrl,
    healthPoints,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
  ) {
    this.id = id;
    this.species = species;
    this.types = types;
    this.imageUrl = imageUrl;
    this.healthPoints = healthPoints;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }

  *getStats() {
    yield this.healthPoints;
    yield this.attack;
    yield this.defense;
    yield this.specialAttack;
    yield this.specialDefense;
    yield this.speed;
  }

  toString() {
    return `Pokemon{id=${this.id}, species=${this.species}, type=${this.type}}`;
  }
}

export default function createPkmn({
  id,
  species,
  types,
  imageUrl,
  healthPoints,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
}) {
  if (!_.isArray(types)) {
    throw new IllegalArgumentException(
      `Expected types to be an array but got: ${typeof types}`
    );
  }

  if (!_.isString(imageUrl)) {
    throw new IllegalArgumentException(
      `Expected imageUrl to be a string but got: ${typeof imageUrl}: ${imageUrl}`
    );
  }

  return Object.freeze(
    new Pokemon(
      createId(id),
      createNonEmptyString(species),
      immutable.List(_.map(types, createType)),
      new URL(imageUrl),
      createStat("hp", healthPoints),
      createStat("attack", attack),
      createStat("defense", defense),
      createStat("special-attack", specialAttack),
      createStat("special-defense", specialDefense),
      createStat("speed", speed)
    )
  );
}
