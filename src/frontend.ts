interface Pokemon {
    name: string;
    url: string;
}
  
interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

interface PokemonInformation {
    sprites: sprites;
}

interface sprites {
    front_default: string;
}

let offset = 0;
let lastOffset = 0;
let limit = 20;

const fetchPokemons = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data:PokemonResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        throw error;
    }
};

const displayPokemons = async (pokemons:Pokemon[]) => {
    const pokemonList = document.querySelector("#pokemon-list");
    if (pokemonList) {
        for (const pokemon of pokemons) {
            await makeCard(pokemon, pokemonList);
        }
    }
};

const makeCard = async (pokemon:Pokemon, pokemonList:Element) => {
    try {
        const response = await fetch(pokemon.url);
        const responseJson: PokemonInformation = await response.json();
        const sprite = responseJson.sprites.front_default;
        const pokemonSprite = document.createElement("img");
        const pokemonName = document.createElement("p");
        const listItem = document.createElement("li");
        if (sprite) {
            pokemonSprite.src = sprite;
        } else {
            pokemonSprite.src = "https://www.virtualblueridge.com/wp-content/uploads/image-not-found.png"
            pokemonSprite.width = 96
            pokemonSprite.height = 96
        }
        pokemonSprite.alt = `sprite for ${pokemon.name}`
        pokemonName.textContent = pokemon.name;
        listItem.appendChild(pokemonSprite);
        listItem.appendChild(pokemonName)
        pokemonList.appendChild(listItem);
    } catch (error) {
        throw error
    }
}

const loadPokemons = async () => {
    try {
        const response = await fetchPokemons();
        await displayPokemons(response.results);
        offset += 20;
    } catch (error) {
        console.error("Error loading more Pokémon:", error);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await loadPokemons();
    window.addEventListener("scroll", async () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (lastOffset === offset) {
                return 
            } else {
                lastOffset = offset
                await loadPokemons();
            }
        }
    });
});

// thought "scrollend" would work better since its built in js but its faster to just manually check for scroll end

// document.addEventListener("DOMContentLoaded", async () => {
//     await loadPokemons();
//     window.addEventListener("scrollend", async () => {
//         await loadPokemons();
//     });
// });
