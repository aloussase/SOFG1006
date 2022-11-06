import { describe, expect, it } from "vitest";
import createNonEmptyString from "../src/domain/common/NonEmptyString";

import createPkmn from "../src/domain/Pokemon";
import createId from "../src/domain/PokemonId";
import createStat from "../src/domain/PokemonStat";

const testPkmn = {
  id: 1,
  species: "bulbasaur",
  types: ["grass", "poison"],
  healthPoints: 100,
  attack: 100,
  defense: 100,
  specialAttack: 60,
  specialDefense: 85,
  speed: 45,
};

const withProps = (props) => {
  return Object.assign(Object.create(testPkmn), props);
};

describe("The Pokemon aggregate", () => {
  it("builds successfully when given valid data", () => {
    // Arrange
    const pkmn = createPkmn(testPkmn);

    // Act

    // Assert
    expect(pkmn.id).toStrictEqual(createId(1));
    expect(pkmn.species).toStrictEqual(createNonEmptyString("bulbasaur"));
    expect(pkmn.healthPoints).toStrictEqual(createStat("hp", 100));
    expect(pkmn.attack).toStrictEqual(createStat("attack", 100));
    expect(pkmn.defense).toStrictEqual(createStat("defense", 100));
    expect(pkmn.specialAttack).toStrictEqual(createStat("special-attack", 60));
    expect(pkmn.specialDefense).toStrictEqual(
      createStat("special-defense", 85)
    );
    expect(pkmn.speed).toStrictEqual(createStat("speed", 45));
  });

  it("Throws an exception when given an id with value less than zero", () => {
    expect(() =>
      createPkmn(
        withProps({
          id: -1,
        })
      )
    ).toThrowError(/id/);
  });

  it("Throws an exception when given a number as the species", () => {
    expect(() =>
      createPkmn(
        withProps({
          species: 42,
        })
      )
    ).toThrow();
  });

  it("Throws an exception when given an value less than zero for a stat", () => {
    expect(() =>
      createPkmn(
        withProps({
          attack: -1,
        })
      )
    ).toThrowError();
  });

  it("Throws an exception when given a string as a type", () => {
    expect(() => {
      createPkmn(
        withProps({
          types: "grass",
        })
      );
    }).toThrowError();
  });

  it("Throws an exception when given an array of a string and a number", () => {
    expect(() => {
      createPkmn(
        withProps({
          types: ["grass", 5],
        })
      );
    }).toThrowError();
  });
});
