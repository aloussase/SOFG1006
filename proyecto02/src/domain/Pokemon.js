import * as _ from "lodash";

import createNonEmptyString from "./common/NonEmptyString.js";
import createId from "./PokemonId.js";
import createStat from "./PokemonStat.js";

class Pokemon {
  constructor(
    id,
    species,
    healthPoints,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
  ) {
    this.id = id;
    this.species = species;
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
    return `Pokemon{
        id=${this.id},
        species=${this.species},
        stats=${_.join(_.toArray(this.getStats()))}
    }`;
  }
}

export default function createPkmn({
  id,
  species,
  healthPoints,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
}) {
  return Object.freeze(
    new Pokemon(
      createId(id),
      createNonEmptyString(species),
      createStat("hp", healthPoints),
      createStat("attack", attack),
      createStat("defense", defense),
      createStat("special-attack", specialAttack),
      createStat("special-defense", specialDefense),
      createStat("speed", speed)
    )
  );
}
