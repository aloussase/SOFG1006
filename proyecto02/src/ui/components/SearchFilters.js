import { PKMN_TYPES } from "../../domain/common/constants.js";

import ComboBox from "./ComboBox";

export default class SearchFilters extends HTMLElement {
  static TYPE_FILTER_CHANGED = "type-filter-changed";

  #type1Filter;
  #type2Filter;

  constructor() {
    super();

    const filters = document.createElement("div");
    filters.setAttribute("id", "filters");
    filters.setAttribute("class", "row");

    this.#type1Filter = this.#createTypeFilter("Tipo 1");
    this.#type1Filter.setAttribute(
      "class",
      "col d-flex align-items-center justify-content-center"
    );

    this.#type2Filter = this.#createTypeFilter("Tipo 2");
    this.#type2Filter.setAttribute("class", "col");

    filters.append(this.#type1Filter, this.#type2Filter);

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
            type1: this.#type1Filter.value ?? "all",
            type2: this.#type2Filter.value ?? "all",
          },
        })
      );
    });

    return typeFilter;
  }
}

customElements.define("search-filters", SearchFilters);
