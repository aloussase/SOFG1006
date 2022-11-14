export default class SearchBar extends HTMLElement {
  /**
   * Event that signals that the search query has changed.
   */
  static SEARCH_QUERY_CHANGED = "search-query-changed";

  constructor() {
    super();

    const div = document.createElement("div");
    div.setAttribute("class", "input-group");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control p-lg-3");
    input.setAttribute("id", "search-box");
    input.setAttribute("placeholder", "Search for a Pokémon");
    input.setAttribute("aria-label", "Search for a Pokémon");
    input.setAttribute("aria-describedby", "search-button");

    input.addEventListener("input", (e) => {
      this.dispatchEvent(
        new CustomEvent(SearchBar.SEARCH_QUERY_CHANGED, {
          detail: {
            query: e.target.value,
          },
        })
      );
    });

    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-secondary");
    button.setAttribute("type", "button");
    button.setAttribute("id", "search-button");
    button.textContent = "Search";

    div.append(input, button);

    this.appendChild(div);
  }
}

customElements.define("search-bar", SearchBar);
