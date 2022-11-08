import * as _ from "lodash";

export default class PokemonCard extends HTMLElement {
  #pkmn;
  #card;

  constructor(pkmn) {
    super();

    if (!pkmn) {
      throw Error(`Expected a valid pokemon, but got: ${pkmn}`);
    }

    this.#pkmn = pkmn;

    this.setAttribute("class", "p-1");

    this.#card = this.#createCard();
    this.appendChild(this.#card);
  }

  #createCard() {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top img-fluid");
    img.alt = this.#pkmn.species;
    img.src = this.#pkmn.imageUrl;

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h4");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = `${this.#pkmn.id}. ${_.capitalize(
      this.#pkmn.species
    )}`;

    const typeBadges = document.createElement("div");
    typeBadges.setAttribute("class", "card-text");

    typeBadges.appendChild(this.#makeTypeBadge(0));

    if (this.#pkmn.types.count() > 1) {
      typeBadges.appendChild(this.#makeTypeBadge(1));
    }

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(typeBadges);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }

  #makeTypeBadge(n) {
    const typeBadge = document.createElement("span");

    typeBadge.setAttribute(
      "class",
      `badge rounded-pill type-${this.#pkmn.types.get(n)}`
    );

    typeBadge.innerHTML = this.#pkmn.types.get(n);

    return typeBadge;
  }
}

customElements.define("pkmn-card", PokemonCard);
