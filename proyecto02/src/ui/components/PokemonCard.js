import * as _ from "lodash";

export default class PokemonCard extends HTMLElement {
  #pkmn;

  constructor(pkmn) {
    super();

    const title = pkmn?.species ?? this.getAttribute("title");
    const text = pkmn?.species ?? this.getAttribute("text");
    const imageUrl = pkmn?.imageUrl ?? this.getAttribute("image");

    if (pkmn) {
      this.#pkmn = pkmn;
    }

    if (_.isEmpty(title)) {
      throw Error(`Expected title to be non-empty`);
    }

    if (_.isEmpty(text)) {
      throw Error(`Expected text to be non-empty`);
    }

    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.alt = title;

    if (imageUrl) {
      img.src = imageUrl;
    }

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h4");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = title;

    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = text;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(img);
    card.appendChild(cardBody);

    this.appendChild(card);
  }
}

customElements.define("pkmn-card", PokemonCard);
