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

  /**
   * Find Pokemon by their name.
   *
   * @param {string} name
   * @return A list containing Pokemon that match the given name.
   */
  async findByName(name) {
    throw Error("Not implemented");
  }

  /**
   * Filter pokemon by type.
   *
   * The special value "all" may be specified to mean "do not take this type into account".
   * `undefined` may be used for this purpose as well.
   *
   * @param {[string, string]} param0 A tuple consisting of the first and second types to filter by.
   * @return An Observable that will emit all Pokemon that have the specified types.
   */
  async findByType([type1, type2]) {
    throw Error("Not implemented");
  }
}
