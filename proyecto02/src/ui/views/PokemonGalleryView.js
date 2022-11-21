import PokemonGallery from "../components/PokemonGallery";
import SearchBar from "../components/SearchBar";
import SearchFilters from "../components/SearchFilters";

export default class PokemonGalleryView extends HTMLElement {
  #pokemonService;
  #gallery;

  constructor(apiService) {
    super();

    if (!apiService) {
      throw Error("Expected apiService to be non-null");
    }

    this.#pokemonService = apiService;

    // FIXME: It would be better to create this as part of the component as well.
    const searchFilters = document.getElementById("search-filters");
    searchFilters.addEventListener(SearchFilters.TYPE_FILTER_CHANGED, (e) =>
      this.#applyEvent(e)
    );

    const searchBarContainer = document.createElement("div");
    searchBarContainer.setAttribute("class", "row");

    const searchBar = new SearchBar();
    searchBar.setAttribute("class", "my-2 w-75 mx-auto");

    searchBar.addEventListener(SearchBar.SEARCH_QUERY_CHANGED, (e) =>
      this.#applyEvent(e)
    );

    searchBarContainer.appendChild(searchBar);

    const galleryContainer = document.createElement("div");
    galleryContainer.setAttribute("class", "row");

    this.#gallery = new PokemonGallery({ items: [] });
    galleryContainer.appendChild(this.#gallery);

    this.setAttribute("class", "min-vh-100");
    this.append(searchBarContainer, galleryContainer);
  }

  async init() {
    setTimeout(
      async () =>
        this.#gallery.setPokemonList(await this.#pokemonService.findAll()),
      2000
    );
  }

  async #applyEvent({ type, detail: payload }) {
    switch (type) {
      case SearchFilters.TYPE_FILTER_CHANGED: {
        const newPkmn = await this.#pokemonService.findByType([
          payload.type1,
          payload.type2,
        ]);
        this.#gallery.setPokemonList(newPkmn);
        break;
      }
      case SearchBar.SEARCH_QUERY_CHANGED: {
        const newPkmn = await this.#pokemonService.findByName(payload.query);
        this.#gallery.setPokemonList(newPkmn);
        break;
      }
    }
  }
}

customElements.define("pokemon-gallery-view", PokemonGalleryView);
