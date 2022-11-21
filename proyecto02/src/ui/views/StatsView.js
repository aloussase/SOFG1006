import * as immutable from "immutable";

import { Chart } from "chart.js";
import { PKMN_TOTAL, PKMN_TYPE_COLORS } from "../../domain/common/constants";

export default class StatsView extends HTMLElement {
  #pokemonService;

  constructor(apiService) {
    super();

    this.#pokemonService = apiService;
  }

  async init() {
    const pokemon = await this.#pokemonService.findAll({ limit: PKMN_TOTAL });
    const chartData = pokemon
      .reduce(
        (m, pokemon) =>
          m
            .update(pokemon.types.get(0)?.type, (count) => (count ?? 0) + 1)
            .update(pokemon.types.get(1)?.type, (count) => (count ?? 0) + 1),
        immutable.Map()
      )
      .filter((_, key) => key !== undefined);

    const keys = chartData.keySeq().toArray();
    const vals = chartData.valueSeq().toArray();

    const chartConfig = this.#chartConfig({
      labels: keys,
      values: vals,
    });

    const chartContainer = document.createElement("div");
    chartContainer.setAttribute(
      "class",
      "container-fluid min-vh-100 bg-white w-75 mx-auto shadow"
    );

    const canvas = document.createElement("canvas");

    new Chart(canvas, chartConfig);

    chartContainer.appendChild(canvas);

    chartContainer.style.width = `500px`;
    chartContainer.style.height = `500px`;

    this.appendChild(chartContainer);
  }

  #chartConfig({ labels, values }) {
    console.log(labels);
    return {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Pokémon Types",
            data: values,
            hoverOffset: 4,
            backgroundColor: labels.map((label) => PKMN_TYPE_COLORS[label]),
          },
        ],
      },
    };
  }
}

customElements.define("stats-view", StatsView);
