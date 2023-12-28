import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const PokemonList = () => {
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
            
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default PokemonList