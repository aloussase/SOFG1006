import { PKMN_TYPES } from "../../domain/common/constants.js";

import ComboBox from "./ComboBox";
import CollapsingHeading from "./CollapsingHeading";

export default class SearchFilters extends HTMLElement {
  constructor() {
    super();

    const collapsingHeading = new CollapsingHeading({
      title: "Filtros",
      target: "filters",
    });

    collapsingHeading.setAttribute(
      "class",
      "pointer hover hover-bg-light py-2"
    );

    const filters = document.createElement("div");
    filters.setAttribute("id", "filters");
    filters.setAttribute("class", "collapse");

    const types = PKMN_TYPES.unshift("all");

    const typeFilter1 = new ComboBox({
      name: "Tipo 1",
      items: types,
    });

    const typeFilter2 = new ComboBox({
      name: "Tipo 2",
      items: types,
    });

    filters.appendChild(typeFilter1);
    filters.appendChild(typeFilter2);

    this.appendChild(collapsingHeading);
    this.appendChild(filters);
  }
}

customElements.define("search-filters", SearchFilters);
