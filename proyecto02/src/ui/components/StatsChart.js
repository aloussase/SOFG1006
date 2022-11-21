import * as _ from "lodash";
import { Chart } from "chart.js";

import { PKMN_TYPE_COLORS, STAT_NAMES } from "../../domain/common/constants";
import { require } from "../../validation";

export default class StatsChart extends HTMLElement {
  constructor({ type, stats, height, width }) {
    super();

    require(_.isArrayLike(
      stats
    ), `Expected stats to be an array but got: ${typeof stats}`);
    require(_.isNumber(
      height
    ), `Expected stats to be a number but got: ${typeof height}`);
    require(_.isNumber(
      width
    ), `Expected stats to be a number but got: ${typeof width}`);

    const chartContainer = document.createElement("div");

    const chartConfig = this.#chartConfig(stats, PKMN_TYPE_COLORS[type]);
    const canvas = document.createElement("canvas");
    new Chart(canvas, chartConfig);

    chartContainer.appendChild(canvas);

    chartContainer.style.width = `${width}px`;
    chartContainer.style.height = `${height}px`;

    this.appendChild(chartContainer);
  }

  #chartConfig(data, backgroundColor = "rgb(255, 99, 132, 0.5)") {
    return {
      type: "radar",
      data: {
        labels: [...STAT_NAMES],
        datasets: [
          {
            label: "Pokemon Stats",
            data,
            fill: true,
            backgroundColor,
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    };
  }
}

customElements.define("stats-chart", StatsChart);
