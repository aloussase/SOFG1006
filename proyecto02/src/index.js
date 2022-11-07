import PokemonApiService from "./infrastructure/PokemonApiService.js";

// Used in index.html
import CollapsingHeading from "./ui/components/CollapsingHeading.js";
import SearchFilters from "./ui/components/SearchFilters.js";
import PokemonCard from "./ui/components/PokemonCard.js";

import "./style.scss";
import PokemonGallery from "./ui/components/PokemonGallery.js";

async function main() {
  const service = new PokemonApiService();
  const pkmn = await service.findAll();

  const gallery = document.getElementById("pkmn-gallery");
  gallery.appendChild(
    new PokemonGallery({
      items: pkmn,
    })
  );
}

document.addEventListener("DOMContentLoaded", main);
