import React from 'react';
import { Button } from 'react-bootstrap';
import PokemonRequest from '../util/PokemonRequest';
import LoadingComponent from './LoadingComponent';
import Spinner from 'react-bootstrap/Spinner';

const MyPokemonCardComponent = ({ pokemon, onHandleRename, isLoadingButtonRename }) => {
    const { id, pokemon_id, nickname, fib_nickname } = pokemon;
    const { data, error } = PokemonRequest('/pokemon', pokemon_id);

    if (error) return <h1>Something went wrong</h1>;
    if (!data) return <LoadingComponent />;

    const isLoading = (isLoadingButtonRename.id == id) & isLoadingButtonRename.isLoading;

    return (
        <div className='pokemon-card rounded-3'>
            <div className='image-card'>
                <img className='rounded-top-3' src={data.sprites.other.home.front_shiny} alt={data.name} />
            </div>
            <div className='body-card'>
                <h4>{fib_nickname == null ? nickname : fib_nickname}</h4>
            </div>
            <div className='footer-card'>
                <Button variant='danger' size='sm'>
                    Release
                </Button>
                <Button variant='success' size='sm' onClick={onHandleRename} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                            {' '}Loading...
                        </>
                    ) : (
                        'Rename'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MyPokemonCardComponent;
