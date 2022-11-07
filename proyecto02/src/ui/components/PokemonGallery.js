import * as _ from "lodash";

import PokemonCard from "./PokemonCard";

export default class PokemonGallery extends HTMLElement {
  constructor({ items }) {
    super();

    const div = document.createElement("div");
    div.setAttribute("class", "card-group");

    items
      .map(
        ({ species }) =>
          new PokemonCard({
            title: species,
            text: species,
          })
      )
      .forEach((card) => div.appendChild(card));

    this.appendChild(div);
  }
}

customElements.define("pkmn-gallery", PokemonGallery);
