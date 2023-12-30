import React, { useState,useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PokemonRequest from '../util/PokemonRequest';
import SpinLoading from '../components/SpinLoading';
import DialogComponent from '../components/DialogComponent';

const PokemonDetail = () => {
    const [dialog, setDialog] = useState({
        message: '',
        isLoading : false,
        name: '',
        image: ''
    })

    const idPokemonRef = useRef();

    const handleDialog = (message, isLoading, name, image) => {
        setDialog({ message, isLoading, name, image });
    };

    const handleCatch = (id, name, image) => {
        handleDialog(
            'Are you sure you want to catch',
            true,
            name,
            image
        )
        idPokemonRef.current = id
    }

    const confirmDialog = (choose) => {
        if (choose) {
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };

    const params = useParams();
    const name = params.name;
    const { data, error } = PokemonRequest('/pokemon', name);

    const isLoading = !data && !error;

    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        dark: '#EE99AC',
    };

    const color = typeColors[data?.types[0]?.type?.name]

    return (
        <>
            {dialog.isLoading && (<DialogComponent message={dialog.message} name={dialog.name} onDialog={confirmDialog} image={dialog.image}/>)}
            <div className='w-100 min-vh-100' style={{ backgroundColor: isLoading ? 'white' : color }}>
                <div className='pokemon-detail'>
                    <Container>
                        {isLoading ? (
                            <Row>
                                <Col className='text-center'>
                                    <SpinLoading />
                                </Col>
                            </Row>
                        ) : (
                            <>
                            <Row>
                                <h1 className='text-center text-white'>{data.name}</h1>
                            </Row>
                            <Row className='mt-5'>
                                <div className='col-xl-6 m-auto order-xl-2 mb-5 mb-xl-0'>
                                    <Card className='card-detail shadow mb-5'>
                                        <Row className='justify-content-center'>
                                            <div className='col-lg-3 order-lg-2'>
                                                <div className='card-detail-image'>
                                                    <img src={data.sprites.other.home.front_shiny} alt='pokemon' />
                                                </div>
                                            </div>
                                        </Row>
                                        <Card.Header className='text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'>
                                            <div className='d-flex justify-content-between'>
                                                <div
                                                    className='pokemon-type text-center fw-bold'
                                                    style={{ color: color, outline: `2px dashed ${color}` }}>
                                                    {data.types[0].type.name}
                                                </div>
                                                <Button variant='dark' onClick={() => handleCatch(data.id,data.name,data.sprites.other.home.front_shiny)}>Catch</Button>
                                            </div>
                                        </Card.Header>
                                        <Card.Body className='pt-0'>
                                            <Row>
                                                <Col>
                                                    <div className='card-profile-stats d-flex justify-content-center'>
                                                        <div>
                                                            <span className='heading'>{data.weight / 10} kg</span>
                                                            <span className='description'>Weight</span>
                                                        </div>
                                                        <div>
                                                            <span className='heading'>{data.height / 10} m</span>
                                                            <span className='description'>Height</span>
                                                        </div>
                                                        <div>
                                                            <span className='heading'>
                                                                {data.abilities.map((ability) => {
                                                                    return `${ability.ability.name}, `;
                                                                })}
                                                            </span>
                                                            <span className='description'>Abilites</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {data.stats.map((stat, index) => {
                                                return (
                                                    <Row key={index} className='mb-3'>
                                                        <Col>
                                                            <span className='text-uppercase opacity-50'>
                                                                {stat.stat.name} ({stat.base_stat})
                                                            </span>
                                                            <div className='progress'>
                                                                <div
                                                                    role='progressbar'
                                                                    className='progress-bar'
                                                                    aria-valuenow={stat.base_stat}
                                                                    aria-valuemin='0'
                                                                    aria-valuemax='100'
                                                                    style={{ width: `${stat.base_stat}%`, backgroundColor: color }}></div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                );
                                            })}
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Row>
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </>
    );
};

export default PokemonDetail;
