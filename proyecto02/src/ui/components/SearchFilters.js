import { PKMN_TYPES } from "../../domain/common/constants.js";

import ComboBox from "./ComboBox";
import CollapsingHeading from "./CollapsingHeading";

export default class SearchFilters extends HTMLElement {
  static TYPE_FILTER_CHANGED = "type-filter-changed";

  #type1Filter;
  #type2Filter;

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

    this.#type1Filter = this.#createTypeFilter("Tipo 1");
    this.#type2Filter = this.#createTypeFilter("Tipo 2");

    filters.appendChild(this.#type1Filter);
    filters.appendChild(this.#type2Filter);

    this.appendChild(collapsingHeading);
    this.appendChild(filters);
  }

  #createTypeFilter(filterName) {
    const types = PKMN_TYPES.unshift("all");

    const typeFilter = new ComboBox({
      name: filterName,
      items: types,
    });

    typeFilter.addEventListener("change", () => {
      this.dispatchEvent(
        new CustomEvent(SearchFilters.TYPE_FILTER_CHANGED, {
          detail: {
            type1: this.#type1Filter.value,
            type2: this.#type2Filter.value,
          },
        })
      );
    });

    return typeFilter;
  }
}

customElements.define("search-filters", SearchFilters);
