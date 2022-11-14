import * as immutable from "immutable";
import * as _ from "lodash";
import { filter, map, pipe, range } from "rambda";

import { PKMN_TOTAL } from "../domain/common/constants";
import PokemonService from "../domain/PokemonService";
import { require } from "../validation.js";

export default class PokemonApiService extends PokemonService {
  #pokemonData;

  constructor() {
    super();

    // Map from Pokémon id to their corresponding data.
    this.#pokemonData = new Map();
  }

  /**
   * Get a notification from any Subjects this service is currently subscribe to.
   * @param message The notification message
   */
  onNext(message) {
    if (message.event === "pokemon") {
      this.#pokemonData.set(message.payload.id, message.payload.pokemon);
    }
  }

  async findAll(o) {
    let offset = o?.offset ?? 0;
    let limit = o?.limit ?? 50;

    require(_.isNumber(
      offset,
      `Expected offset to be a number but got: ${typeof offset}`
    ));
    require(_.isNumber(
      limit,
      `Expected limit to be a number but got: ${typeof limit}`
    ));

    offset = Math.min(offset, PKMN_TOTAL);
    limit = Math.min(limit, PKMN_TOTAL - offset);

    return immutable.List(
      pipe(
        filter((i) => this.#pokemonData.has(i)),
        map((i) => this.#pokemonData.get(i))
      )(range(offset, offset + limit + 1))
    );
  }

  async findByName(name) {
    if (_.isEmpty(name)) {
      return await this.findAll();
    }

    return immutable.List(
      filter(
        ({ species }) => species.toString().includes(name.toLowerCase()),
        [...this.#pokemonData.values()]
      )
    );
  }

  async findByType([targetType1, targetType2]) {
    require(_.isString(
      targetType1,
      `Expected type 1 to be a string but: ${typeof targetType1}`
    ));
    require(_.isString(
      targetType2,
      `Expected type 1 to be a string but: ${typeof targetType2}`
    ));

    const typesMatch = (pkmnType, targetType) =>
      targetType === undefined ||
      targetType === "all" ||
      pkmnType?.type === targetType;

    return immutable.List(
      filter(
        (pkmn) =>
          typesMatch(pkmn.types.get(0), targetType1) &&
          typesMatch(pkmn.types.get(1), targetType2),
        [...this.#pokemonData.values()]
      )
    );
  }
}
