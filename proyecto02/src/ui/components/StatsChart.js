import * as _ from "lodash";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { STAT_NAMES } from "../../domain/common/constants";
import { require } from "../../validation";

export default class StatsChart extends HTMLElement {
  #makeChartConfig(data) {
    return {
      type: "radar",
      data: {
        labels: [...STAT_NAMES],
        datasets: [
          {
            label: "Pokemon Stats",
            data,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
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

  constructor({ stats, height, width }) {
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

    Chart.register(
      RadarController,
      RadialLinearScale,
      PointElement,
      LineElement
    );

    const chartContainer = document.createElement("div");

    const chartConfig = this.#makeChartConfig(stats);
    const canvas = document.createElement("canvas");
    new Chart(canvas, chartConfig);

    chartContainer.appendChild(canvas);

    chartContainer.style.width = `${width}px`;
    chartContainer.style.height = `${height}px`;

    this.appendChild(chartContainer);
  }
}

customElements.define("stats-chart", StatsChart);
