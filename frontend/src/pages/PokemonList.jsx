import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import PokemonRequest from '../util/PokemonRequest'
import PokemonCardComponent from '../components/PokemonCardComponent'

const PokemonList = () => {

  const {data : result, error} = PokemonRequest('/pokemon')
  if(error) return <h1>Something went wrong</h1>
  if(!result) return <h1>Loading</h1>

  return (
    <div className='pokemon-list'>
      <Container>
        <Row>
          <Col>
            <h1 className='text-center fw-bold pb-5'>Pokemon List</h1>
          </Col>
        </Row>
        <Row>
          <div className="pokemon-content">
            {
              result.results.map((pokemon) => (
                <PokemonCardComponent key= {pokemon.name} pokemon={pokemon}/>
              ))
            }
          </div>
          <Row>
            <Col>
              <div className="next">
                <button className="next-btn">
                  Load More &darr;
                </button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  )
}

export default PokemonList