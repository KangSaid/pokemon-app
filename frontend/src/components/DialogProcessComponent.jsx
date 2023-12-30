import React from 'react';
import SpinLoading from './SpinLoading';
import PokemonRequest from '../util/PokemonRequest';

const DialogProcessComponent = ({pokemonName,title, results, onClose, id}) => {
    let image = '';
    if(id != ""){
        const { data, error } = PokemonRequest('/pokemon', id);
        image = data.sprites.other.home.front_shiny;
    }


    return (
        <div className={`dialog show`}>
            <div className='dialog-content'>
                <div className='dialog-process'>
                    <h2 className='dialog-title text-capitalize text-center'>{pokemonName}</h2>
                </div>
                <div className='dialog-body'>
                    <div className='dialog-img-body mb-5'>
                        <img src={image} alt='' />
                    </div>
                    <div className='dialog-message'>
                        <SpinLoading/>
                    </div>
                    <p className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                        Process {title}...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DialogProcessComponent;
