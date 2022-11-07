import { PKMN_TYPES } from "./domain/common/constants.js";
import PokemonApiService from "./infrastructure/PokemonApiService.js";

import ComboBox from "./ui/components/ComboBox.js";
import CollapsingHeading from "./ui/components/CollapsingHeading.js";

import "./style.scss";

const service = new PokemonApiService();

const filters = document.getElementById("filters");

const types = PKMN_TYPES.unshift("all");

filters.appendChild(
  new ComboBox({
    name: "Tipo 1",
    items: types,
  })
);

filters.appendChild(
  new ComboBox({
    name: "Tipo 2",
    items: types,
  })
);
