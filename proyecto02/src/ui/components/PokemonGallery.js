import * as _ from "lodash";

import PokemonCard from "./PokemonCard";

export default class PokemonGallery extends HTMLElement {
  #root;

  constructor({ items }) {
    super();

    this.#root = document.createElement("div");
    this.#root.setAttribute("class", "card-group justify-content-center");

    // Pass through each pokemon to the card.
    this.setPokemonList(items);

    this.appendChild(this.#root);
  }

  /**
   * Set the list of pokemon displayed by the gallery.
   */
  setPokemonList(pokemonList) {
    this.#root.replaceChildren(
      ...pokemonList.map((pokemon) => new PokemonCard(pokemon))
    );
  }
}

customElements.define("pkmn-gallery", PokemonGallery);
