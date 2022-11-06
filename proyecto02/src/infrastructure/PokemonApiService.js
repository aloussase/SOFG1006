import * as _ from "lodash";
import IllegalArgumentException from "../domain/common/IllegalArgumentException";

import PokemonService from "../domain/PokemonService";

export default class PokemonApiService extends PokemonService {
  constructor() {
    super();
    this.pokemon = [];
  }

  async findAll(o) {
    o = o ?? {};
    const offset = o.offset ?? 0;
    const limit = o.limit ?? 20;

    if (!_.isNumber(offset)) {
      throw new IllegalArgumentException(
        `Expect offset to be a number but got: ${typeof offset}`
      );
    }

    if (!_.isNumber(limit)) {
      throw new IllegalArgumentException(
        `Expect limit to be a number but got: ${typeof limit}`
      );
    }

    if (offset < this.pokemon.length && limit < this.pokemon.length - offset) {
      return this.pokemon.slice(offset, offset + limit + 1);
    }

    // TODO: Calculate necessary offset to avoid asking for the same info again.

    console.log(this.pokemon);
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    // TODO: Check for errors.

    this.pokemon = (await resp.json()).results;

    return this.pokemon.slice(offset, offset + limit + 1);
  }
}
