import React from 'react';
import SpinLoading from './SpinLoading';
import PokemonRequest from '../util/PokemonRequest';
import Alert from 'react-bootstrap/Alert';


const DialogProcessComponent = ({ pokemonName, title, results, onClose, pokemonId }) => {
    
    const { data, error } = PokemonRequest('/pokemon', pokemonId);
    const image = data.sprites.other.home.front_shiny;

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
                    {
                        results === "" ? (
                            <>
                                <div className='dialog-message'>
                                    <SpinLoading />
                                </div>
                                <p className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                    Process {title}...
                                </p>
                            </>
                        ) : (
                            <>
                            <div className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                <Alert variant={results ? 'success' : 'danger'}>
                                    {title}
                                </Alert>
                            </div>
                            <div className='dialog-footer'>
                                <button className='btn-dialog btn-dialog-cancel' onClick={() => onClose()}>
                                    Cancel
                                </button>
                            </div>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default DialogProcessComponent;
