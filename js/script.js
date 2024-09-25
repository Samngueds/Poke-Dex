const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        return await APIResponse.json();
    } else {
        return null; // Retorna null em caso de erro
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitaliza o nome
        pokemonNumber.innerHTML = `#${data.id}`; // Adiciona o formato de número
        pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;

        // Limpar o contêiner de tipos antes de adicionar novos
        const typeContainer = document.querySelector('.pokemon__type');
        typeContainer.innerHTML = ''; // Limpa o conteúdo existente

        // Adicionando tipos e cores dinamicamente
        const types = data.types.map(typeInfo => typeInfo.type.name);
        types.forEach(type => {
            const typeBox = document.createElement('div');
            typeBox.classList.add('type-box');
            typeBox.style.backgroundColor = colours[type]; // Define a cor do tipo
            typeBox.innerHTML = type.charAt(0).toUpperCase() + type.slice(1); // Capitaliza o nome do tipo
            typeContainer.appendChild(typeBox); // Adiciona a caixa de tipo ao contêiner
        });
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Inicializa a renderização do Pokémon padrão
renderPokemon(searchPokemon);
