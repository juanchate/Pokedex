const pokedex = document.getElementById("pokedex");
const pokeCache = [];
// const fetchPokemon = () => {
//     const promises = [];
//     for (let i = 1; i <= 150; i++) {
//         const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//         promises.push(fetch(url).then(res => res.json()));
//     }
    
//     Promise.all(promises).then((results) => {
//         const pokemons = results.map((data) => ({
//             name: data.name,
//             id: data.id,
//             image: data.sprites['front_default'],
//             type: data.types.map((type) => type.type.name).join(', ')
//         }));
//         displayPokemons(pokemons);
//     });
// }

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemons = data.results.map((result, index) => ({
        ...result,
        id: index+1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
    }));
    displayPokemons(pokemons);
}

const displayPokemons = (pokemons) => {
    const pokemonHTMLString = pokemons.map(poke => `
    <li class="card" onclick="selectPokemon(${poke.id})">
        <img class="card-image" src="${poke.image}"/>
        <h2 class="card-title">${poke.id}. ${poke.name}</h2>
    </li>
    `).join("");
    pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async (id) => {
    if(pokeCache[id] == null) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        displayPopup(pokeman);
    } else {
        displayPopup(pokeCache[id]);
    }
}

const displayPopup = (pokemon) => {
    console.log(pokemon);
    const type = pokemon.types.map((type) => type.type.name).join(', ');
    console.log(type);
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div style="background-color: white" class="card" onclick="selectPokemon(${pokemon.id})">
                <img class="card-image" src="${pokemon.sprites.front_default}"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p><small>Height: </small>${pokemon.height}
                    <small>Weight: </small>${pokemon.weight}
                    <small>Type: </small>${type}
            </div>
        </div>
    `
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
}

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.remove();
}

fetchPokemon();