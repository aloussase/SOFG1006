import * as _ from "lodash";
import StatsChart from "./StatsChart";

export default class PokemonCard extends HTMLElement {
  #pkmn;
  #card;
  #cardImage;
  #statsChart;

  constructor(pkmn) {
    super();

    if (!pkmn) {
      throw Error(`Expected a valid pokemon, but got: ${pkmn}`);
    }

    this.setAttribute("class", "pb-1 pe-1");

    this.#pkmn = pkmn;

    this.#card = this.#createCard();
    this.#statsChart = this.#createStatsChart();

    this.appendChild(this.#card);

    this.addEventListener("mouseover", () =>
      this.#cardImage.replaceWith(this.#statsChart)
    );

    this.addEventListener("mouseout", () =>
      this.#statsChart.replaceWith(this.#cardImage)
    );
  }

  #createStatsChart() {
    return new StatsChart({
      type: this.#pkmn.types.get(0).type,
      stats: [...this.#pkmn.getStats()].map((stat) => stat.value),
      height: 475,
      width: 500,
    });
  }

  #createCard() {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top img-fluid");
    img.alt = this.#pkmn.species;
    img.src = this.#pkmn.imageUrl;

    this.#cardImage = img;

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

    typeBadge.textContent = this.#pkmn.types.get(n);

    return typeBadge;
  }
}

customElements.define("pkmn-card", PokemonCard);
