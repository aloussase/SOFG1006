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

    // TODO: Request the service to apply the filters.
    this.#searchFilters.addEventListener(
      SearchFilters.TYPE1_FILTER_CHANGED,
      ({ detail }) => console.log(detail)
    );
    this.#searchFilters.addEventListener(
      SearchFilters.TYPE2_FILTER_CHANGED,
      ({ detail }) => console.log(detail)
    );

    this.#pkmnService = new PokemonApiService();
  }

  async init() {
    const pkmn = await this.#pkmnService.findAll();
    this.#gallery.appendChild(
      new PokemonGallery({
        items: pkmn,
      })
    );
  }
}

async function main() {
  const ui = new UI();

  await ui.init();
}

document.addEventListener("DOMContentLoaded", main);
