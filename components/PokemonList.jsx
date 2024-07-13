import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                const promises = response.data.results.map(async (pokemon) => {
                    const result = await axios.get(pokemon.url);
                    return {
                        name: pokemon.name,
                        image: result.data.sprites.other['official-artwork'].front_default || result.data.sprites.front_default
                    };
                });
                const results = await Promise.all(promises);
                setPokemons(results);
            } catch (error) {
                console.error("There was an error fetching the Pokémon data!", error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon, index) => (
                <div key={index} className="pokemon-card">
                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                    <h3 className="pokemon-name">{pokemon.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default PokemonList;
