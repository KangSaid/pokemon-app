import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyPokemonCardComponent from '../components/MyPokemonCardComponent';
import { LoadInfinitePokeDex } from '../util/LoadInfinite';

const MyPokemon = () => {
    const { data, error, isLoading, loadMore } = LoadInfinitePokeDex('/pokemons', 20);
    if(isLoading || error) return <div>Loading ...</div>
    
    return (
        <div className='pokemon-list'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center fw-bold pb-5'>My Pokemon</h1>
                    </Col>
                </Row>
                <Row>
                    <div className='pokemon-content'>
                      {
                        data.map((pokemons) => {
                          return pokemons.map((pokemon,index) => (
                            <MyPokemonCardComponent key={index} pokemon={pokemon}/>
                          ))
                        })
                      }
                    </div>
                </Row>
                <Row>
                  <Col>
                    <div className="next">
                      <button className="next-btn" onClick={loadMore}>
                        Load More &darr;
                      </button>
                    </div>
                  </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyPokemon;
