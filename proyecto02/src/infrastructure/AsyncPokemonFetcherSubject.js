import * as _ from "lodash";
import * as immutable from "immutable";
import createPkmn from "../domain/Pokemon.js";
import {PKMN_TOTAL} from "../domain/common/constants.js";

export default class AsyncPokemonFetcherSubject {
    static observers = [];

    /**
     * Subscribe to receive notifications from this AsyncPokemonFetcherSubject.
     *
     * Messages are tagged with an 'event' key so they may be recognized. The messages
     * this subject produces are:
     *
     * - 'completed' when the subject has nothing further to emit
     * - 'pokemon' when the subject will emit a new pokemon.
     *
     * The 'pokemon' message has a payload containing the pokemon id and the pokemon.
     *
     * @param o The object that wants to subscribe.
     */
    static subscribe(o) {
        this.observers.push(o)
    }

    /**
     * Unsubscribe from this subject.
     * @param o The object that wants to unsubscribe.
     */
    static unsubscribe(o) {
        this.observers = this.observers.filter(obs => obs !== o)
    }

    static #notify(message) {
        this.observers.forEach(o => o.onNext(message))
    }

    static #parsePokemon({
                             id,
                             name: species,
                             stats: sts,
                             types: ts,
                             sprites,
                         }) {
        // Map each type object to its name.
        const types = _.map(ts, _.partial(_.get, _, ["type", "name"]));

        // Map the array of stats to a map from the stat name to the base stat.
        const stats = _.reduce(
            sts,
            (m, {base_stat, stat}) => m.set(stat.name, base_stat),
            immutable.Map()
        );

        const imageUrl = _.get(sprites, [
            "other",
            "official-artwork",
            "front_default",
        ]);

        return createPkmn({
            id,
            species,
            types,
            imageUrl,
            healthPoints: stats.get("hp"),
            attack: stats.get("attack"),
            defense: stats.get("defense"),
            specialAttack: stats.get("special-attack"),
            specialDefense: stats.get("special-defense"),
            speed: stats.get("speed"),
        });
    }

    /**
     * Start fetching Pokémon.
     * @returns {Promise<void>}
     */
    static async connect({fetchedCount, offset, limit} = {
        offset: 0,
        limit: 50,
        fetchedCount: 0,
    }) {
        if (!(fetchedCount < PKMN_TOTAL)) {
            this.#notify({event: 'completed'})
            return;
        }

        for (
            let i = offset;
            i < Math.min(offset + limit, PKMN_TOTAL);
            i++
        ) {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
                .then(resp => resp.json())
                .then(json => this.#parsePokemon(json))
                .then(pokemon => this.#notify({
                    event: 'pokemon',
                    payload: {
                        // We want the number here, not the PokemonId.
                        id: pokemon.id.id,
                        pokemon,
                    },
                }))
                .then(() => fetchedCount += 1)
                .catch(console.error);
        }

        setTimeout(
            () => this.connect({fetchedCount, offset: offset + limit, limit}),
            1000
        );
    }
}