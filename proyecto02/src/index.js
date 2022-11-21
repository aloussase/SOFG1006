import { Chart, registerables } from "chart.js";

import PokemonApiService from "./infrastructure/PokemonApiService.js";

// Used in index.html
import AsyncPokemonFetcherSubject from "./infrastructure/AsyncPokemonFetcherSubject.js";
import DismissableAlert from "./ui/components/DismissableAlert.js";

import "./style.scss";
import PokemonGalleryView from "./ui/views/PokemonGalleryView.js";
import StatsView from "./ui/views/StatsView.js";

class UI {
  #pokemonService;
  #pokemonGalleryView;
  #statsView;
  #mainContainer;

  constructor() {
    this.#mainContainer = document.getElementById("main-container");

    this.#pokemonService = new PokemonApiService();
    this.#pokemonGalleryView = new PokemonGalleryView(this.#pokemonService);
    this.#statsView = new StatsView(this.#pokemonService);

    const showStatsBtn = document.getElementById("show-stats");
    let showingStats = false;

    showStatsBtn.addEventListener("click", () => {
      if (showingStats) {
        showStatsBtn.textContent = "Estadísticas";
        this.#mainContainer.replaceChildren(this.#pokemonGalleryView);
      } else {
        showStatsBtn.textContent = "Pokémon";
        this.#mainContainer.replaceChildren(this.#statsView);
      }

      showingStats = !showingStats;
    });
  }

  onNext(msg) {
    if (msg.event !== "completed") return;
    this.#onDataLoadCompleted();
  }

  async #onDataLoadCompleted() {
    await this.#statsView.init();

    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.replaceChildren(
      new DismissableAlert({
        message:
          "Finished loading the Pokémon data. You may now see the statistics.",
      })
    );
  }

  async init() {
    AsyncPokemonFetcherSubject.subscribe(this);
    AsyncPokemonFetcherSubject.connect();

    await this.#pokemonGalleryView
      .init()
      .then(() =>
        this.#mainContainer.replaceChildren(this.#pokemonGalleryView)
      );
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  Chart.register(...registerables);
  await new UI().init();
});
