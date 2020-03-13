const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    
    Promise.all(promises).then((results) => {
        const pokemons = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemons(pokemons);
    });
}

const displayPokemons = (pokemons) => {
    console.log(pokemons);
    const pokemonHTMLString = pokemons.map(poke => `
    <li>
        <img src="${poke.image}"/>
        <h2>${poke.id}. ${poke.name}</h2>
        <p>${poke.type}</p>
    `).join("");
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();