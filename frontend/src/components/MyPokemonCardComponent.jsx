import React from 'react';
import {Button} from 'react-bootstrap'
import PokemonRequest from '../util/PokemonRequest';
import LoadingComponent from './LoadingComponent';

const MyPokemonCardComponent = ({pokemon}) => {
    const {pokemon_id, nickname, fib_nickname} = pokemon
    const {data, error } = PokemonRequest('/pokemon',pokemon_id)

    if (error) return <h1>Something went wrong</h1>;
    if (!data) return <LoadingComponent/>;

    return (
        <div className='pokemon-card rounded-3'>
            <div className='image-card'>
                <img
                    className='rounded-top-3'
                    src={data.sprites.other.home.front_shiny}
                    alt={data.name}
                />
            </div>
            <div className='body-card'>
                <h4>{fib_nickname == null ? nickname : fib_nickname}</h4>
            </div>
            <div className='footer-card'>
                <Button variant='danger' size='sm'>
                    Release
                </Button>
                <Button variant='success' size='sm'>
                    Rename
                </Button>
            </div>
        </div>
    );
};

export default MyPokemonCardComponent;
