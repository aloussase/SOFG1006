import PokemonApiService from "./infrastructure/PokemonApiService.js";

// Used in index.html
import AsyncPokemonFetcherSubject from "./infrastructure/AsyncPokemonFetcherSubject.js";
import DismissableAlert from "./ui/components/DismissableAlert.js";

import "./style.scss";
import PokemonGalleryView from "./ui/views/PokemonGalleryView.js";

class UI {
  #pokemonService;
  #pokemonGalleryView;
  #mainContainer;

  constructor() {
    this.#mainContainer = document.getElementById("main-container");

    this.#pokemonService = new PokemonApiService();
    this.#pokemonGalleryView = new PokemonGalleryView(this.#pokemonService);

    const showStatsBtn = document.getElementById("show-stats");
    let showingStats = false;

    showStatsBtn.addEventListener("click", () => {
      if (showingStats) {
        showStatsBtn.textContent = "Estadísticas";
        this.#mainContainer.replaceChildren(this.#pokemonGalleryView);
      } else {
        showStatsBtn.textContent = "Pokémon";
        this.#mainContainer.replaceChildren();
      }

      showingStats = !showingStats;
    });
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

  async init() {
    AsyncPokemonFetcherSubject.subscribe(this);
    AsyncPokemonFetcherSubject.subscribe(this.#pokemonService);
    AsyncPokemonFetcherSubject.connect();

    this.#pokemonGalleryView
      .init()
      .then(() =>
        this.#mainContainer.replaceChildren(this.#pokemonGalleryView)
      );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  async () => await new UI().init()
);
