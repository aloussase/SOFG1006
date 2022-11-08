import PokemonApiService from "./infrastructure/PokemonApiService.js";

// Used in index.html
import CollapsingHeading from "./ui/components/CollapsingHeading.js";
import SearchFilters from "./ui/components/SearchFilters.js";
import PokemonCard from "./ui/components/PokemonCard.js";

import "./style.scss";
import PokemonGallery from "./ui/components/PokemonGallery.js";

class UI {
  #gallery;
  #pkmnService;
  #searchFilters;

  constructor() {
    this.#gallery = document.getElementById("pkmn-gallery");
    this.#searchFilters = document.getElementById("search-filters");

    this.#pkmnService = new PokemonApiService();

    this.#searchFilters.addEventListener(
      SearchFilters.TYPE_FILTER_CHANGED,
      ({ detail: types }) => {
        this.#pkmnService.findByType([types.type1, types.type2]);
      }
    );
  }

  #setPkmnList(pkmn) {
    this.#gallery.replaceChildren(
      new PokemonGallery({
        items: pkmn,
      })
    );
  }

  async init() {
    this.#setPkmnList(await this.#pkmnService.findAll());
  }
}

async function main() {
  const ui = new UI();

  await ui.init();
}

document.addEventListener("DOMContentLoaded", main);
