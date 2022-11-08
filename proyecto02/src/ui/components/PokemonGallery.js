import * as _ from "lodash";

import PokemonCard from "./PokemonCard";

export default class PokemonGallery extends HTMLElement {
  constructor({ items }) {
    super();

    const div = document.createElement("div");
    div.setAttribute("class", "card-group justify-content-center");

    // Pass through each pokemon to the card.
    items
      .map((item) => new PokemonCard(item))
      .forEach((card) => div.appendChild(card));

    this.appendChild(div);
  }
}

customElements.define("pkmn-gallery", PokemonGallery);
