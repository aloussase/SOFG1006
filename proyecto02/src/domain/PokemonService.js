export default class PokemonService {
  constructor() {}

  /**
   * @param offset The offset from which to start returning Pokemon.
   * @param limit How many Pokemon to return.
   * @return An Observable that emits all Pokemon.
   */
  async findAll({ offset, limit }) {
    throw Error("Not implemented");
  }
}
