import PokemonApiService from "./infrastructure/PokemonApiService.js";

// Used in index.html
import AsyncPokemonFetcherSubject from "./infrastructure/AsyncPokemonFetcherSubject.js";
import DismissableAlert from "./ui/components/DismissableAlert.js";
import PokemonGallery from "./ui/components/PokemonGallery.js";
import SearchFilters from "./ui/components/SearchFilters.js";

import "./style.scss";

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
      (e) => this.#applyTypeFilters(e)
    );
  }

  async #applyTypeFilters({ detail: types }) {
    this.#setPkmnList(
      await this.#pkmnService.findByType([types.type1, types.type2])
    );
  }

  onNext(msg) {
    if (msg.event !== "completed") return;

    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.replaceChildren(
      new DismissableAlert({
        message: "Finished loading the Pokémon data",
      })
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
    AsyncPokemonFetcherSubject.subscribe(this);
    AsyncPokemonFetcherSubject.subscribe(this.#pkmnService);
    AsyncPokemonFetcherSubject.connect();
    setTimeout(
      async () => this.#setPkmnList(await this.#pkmnService.findAll()),
      2000
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  async () => await new UI().init()
);
