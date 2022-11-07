import * as _ from "lodash";
import * as immutable from "immutable";

import { PKMN_TOTAL } from "../domain/common/constants";
import IllegalArgumentException from "../domain/common/IllegalArgumentException";
import createPkmn from "../domain/Pokemon";
import PokemonService from "../domain/PokemonService";

/**
 * Contains information need to retrieve data for a specific pokemon.
 */
class PokemonInfoEndpoint {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  /**
   * Make a request to the pokemon api to fetch information for the corresponding pokemon.
   *
   * @returns The pokemon corresponding to this endpoint.
   */
  async getPokemon() {
    const resp = await fetch(this.url);

    if (!resp.ok) {
      throw Error(`Failed to fetch data for pokemon: ${this.name}`);
    }

    const {
      id,
      name: species,
      stats: sts,
      types: ts,
      sprites,
    } = await resp.json();

    // Map each type object to its name.
    const types = _.map(ts, _.partial(_.get, _, ["type", "name"]));

    // Map the array of stats to a map from the stat name to the base stat.
    const stats = _.reduce(
      sts,
      (m, { base_stat, stat }) => m.set(stat.name, base_stat),
      immutable.Map()
    );

    const imageUrl = _.get(sprites, [
      "other",
      "official-artwork",
      "front_default",
    ]);

    return createPkmn({
      id,
      species,
      types,
      imageUrl,
      healthPoints: stats.get("hp"),
      attack: stats.get("attack"),
      defense: stats.get("defense"),
      specialAttack: stats.get("special-attack"),
      specialDefense: stats.get("special-defense"),
      speed: stats.get("speed"),
    });
  }

  toString() {
    return JSON.stringify(this);
  }
}

export default class PokemonApiService extends PokemonService {
  #infoEndpoints;
  #pokemonData;

  constructor() {
    super();

    // List of endpoints from which to get pokemon data.
    this.#infoEndpoints = undefined;

    // Map from pokemon id to their corresponding data.
    this.#pokemonData = new Map();
  }

  async #getInfoEndpoints() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${PKMN_TOTAL}`)
      .then((resp) => resp.json())
      .then(({ results }) =>
        immutable.List(
          _.map(results, ({ name, url }) => new PokemonInfoEndpoint(name, url))
        )
      );
  }

  async findAll(o) {
    let offset = o?.offset ?? 0;
    let limit = o?.limit ?? 20;

    if (!_.isNumber(offset)) {
      throw new IllegalArgumentException(
        `Expected offset to be a number but got: ${typeof offset}`
      );
    }

    if (!_.isNumber(limit)) {
      throw new IllegalArgumentException(
        `Expected limit to be a number but got: ${typeof limit}`
      );
    }

    if (!this.#infoEndpoints) {
      this.#infoEndpoints = await this.#getInfoEndpoints();
    }

    offset = Math.min(offset, PKMN_TOTAL);
    limit = Math.min(limit, PKMN_TOTAL - offset);

    return immutable.List(
      await Promise.all(
        _.map(_.range(offset, offset + limit + 1), async (i) => {
          if (!this.#pokemonData.has(i)) {
            this.#pokemonData.set(
              i,
              await this.#infoEndpoints.get(i).getPokemon()
            );
          }

          return this.#pokemonData.get(i);
        })
      )
    );
  }
}
