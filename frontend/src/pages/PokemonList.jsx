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
            <div className="pokemon-card effect-card">
              <div className="image-card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/132.png" alt="" />
              </div>
              <div className="body-card">
                <h4>Nama Pokemon - 1 - Keindahan yang bagus dan</h4>
              </div>
              <div className="footer-card">
                <span>More Details &nbsp; &rarr;</span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default PokemonList