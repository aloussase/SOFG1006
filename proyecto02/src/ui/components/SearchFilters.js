import { PKMN_TYPES } from "../../domain/common/constants.js";

import ComboBox from "./ComboBox";
import CollapsingHeading from "./CollapsingHeading";

export default class SearchFilters extends HTMLElement {
  static TYPE1_FILTER_CHANGED = "type-1-changed";
  static TYPE2_FILTER_CHANGED = "type-2-changed";

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

    const [type1Filter, type2Filter] = this.#createTypeFilters();

    filters.appendChild(type1Filter);
    filters.appendChild(type2Filter);

    this.appendChild(collapsingHeading);
    this.appendChild(filters);
  }

  #createTypeFilter(filterName, filterEvent) {
    const types = PKMN_TYPES.unshift("all");

    const typeFilter = new ComboBox({
      name: filterName,
      items: types,
    });

    typeFilter.addEventListener("change", (e) => {
      this.dispatchEvent(
        new CustomEvent(filterEvent, {
          detail: e.target.value,
        })
      );
    });

    return typeFilter;
  }

  #createTypeFilters() {
    const type1Filter = this.#createTypeFilter(
      "Tipo 1",
      SearchFilters.TYPE1_FILTER_CHANGED
    );
    const type2Filter = this.#createTypeFilter(
      "Tipo 2",
      SearchFilters.TYPE2_FILTER_CHANGED
    );
    return [type1Filter, type2Filter];
  }
}

customElements.define("search-filters", SearchFilters);
