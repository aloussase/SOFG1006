import * as _ from "lodash";

export default class PokemonCard extends HTMLElement {
  constructor(attrs) {
    super();

    const title = attrs?.title ?? this.getAttribute("title");
    const text = attrs?.text ?? this.getAttribute("text");
    const imageUrl = attrs?.image ?? this.getAttribute("image");

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
