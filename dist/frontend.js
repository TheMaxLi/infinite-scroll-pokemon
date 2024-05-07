"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let offset = 0;
let lastOffset = 0;
let limit = 20;
const fetchPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching Pokémon:", error);
        throw error;
    }
});
const displayPokemons = (pokemons) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonList = document.querySelector("#pokemon-list");
    if (pokemonList) {
        for (const pokemon of pokemons) {
            yield makeCard(pokemon, pokemonList);
        }
    }
});
const makeCard = (pokemon, pokemonList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(pokemon.url);
        const responseJson = yield response.json();
        const sprite = responseJson.sprites.front_default;
        const pokemonSprite = document.createElement("img");
        const pokemonName = document.createElement("p");
        const listItem = document.createElement("li");
        if (sprite) {
            pokemonSprite.src = sprite;
        }
        else {
            pokemonSprite.src = "https://www.virtualblueridge.com/wp-content/uploads/image-not-found.png";
            pokemonSprite.width = 96;
            pokemonSprite.height = 96;
        }
        pokemonSprite.alt = `sprite for ${pokemon.name}`;
        pokemonName.textContent = pokemon.name;
        listItem.appendChild(pokemonSprite);
        listItem.appendChild(pokemonName);
        pokemonList.appendChild(listItem);
    }
    catch (error) {
        throw error;
    }
});
const loadPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchPokemons();
        yield displayPokemons(response.results);
        offset += 20;
    }
    catch (error) {
        console.error("Error loading more Pokémon:", error);
    }
});
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadPokemons();
    window.addEventListener("scroll", () => __awaiter(void 0, void 0, void 0, function* () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (lastOffset === offset) {
                return;
            }
            else {
                lastOffset = offset;
                yield loadPokemons();
            }
        }
    }));
}));
// thought "scrollend" would work better since its built in js but its faster to just manually check for scroll end
// document.addEventListener("DOMContentLoaded", async () => {
//     await loadPokemons();
//     window.addEventListener("scrollend", async () => {
//         await loadPokemons();
//     });
// });
