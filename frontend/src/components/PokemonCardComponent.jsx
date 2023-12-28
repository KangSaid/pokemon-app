import React from 'react';

const PokemonCardComponent = () => {
    return (
        <div className='pokemon-card effect-card rounded-3'>
            <div className='image-card'>
                <img
                    className='rounded-top-3'
                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/132.png'
                    alt=''
                />
            </div>
            <div className='body-card'>
                <h4>Nama Pokemon - 1 - Keindahan yang bagus dan</h4>
            </div>
            <div className='footer-card'>
                <span>More Details &nbsp; &rarr;</span>
            </div>
        </div>
    );
};

export default PokemonCardComponent;
