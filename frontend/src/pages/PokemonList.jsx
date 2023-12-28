import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import PokemonCardComponent from '../components/PokemonCardComponent'
import LoadInfinite from '../util/LoadInfinite'

const PokemonList = () => {

  const {data, error, isLoading, loadMore} = LoadInfinite('/pokemon',20)

  if(isLoading || error) return <div>Loading ...</div>

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
              data.map((pokemons) => {
                return pokemons.map((pokemon,index) => (
                  <PokemonCardComponent key= {index} pokemon={pokemon}/>
                ))
              })
            }
          </div>
          <Row>
            <Col>
              <div className="next">
                <button className="next-btn" onClick={loadMore}>
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