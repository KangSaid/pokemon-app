import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyPokemonCardComponent from '../components/MyPokemonCardComponent';
import { LoadInfinitePokeDex } from '../util/LoadInfinite';
import axios from 'axios'

const MyPokemon = () => {
    const { data, error, isLoading, loadMore, mutate } = LoadInfinitePokeDex('/pokemons', 20);
    const [loadingButtonRename, setLoadingButtonRename] = useState({
      isLoading : false,
      id : ''
    })

    if(isLoading || error) return <div>Loading ...</div>

    const handleRename = async (id) => {
      try {
        setLoadingButtonRename({isLoading: true, id : id})
        await axios.patch(`http://localhost/pokemons/${id}`,{
          id: id
        })
        mutate()
        setLoadingButtonRename({isLoading: false, id : id})
      } catch (error) {
        console.log(error.message)
      }
      
    }
    
    return (
        <>
        <div className='pokemon-list'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center fw-bold pb-5'>My Pokemon</h1>
                    </Col>
                </Row>
                {
                  data[0].length > 0 && (
                    <>
                      <Row>
                          <div className='pokemon-content'>
                            {
                              data.map((pokemons) => {
                                return pokemons.map((pokemon,index) => (
                                  <MyPokemonCardComponent key={index} pokemon={pokemon} onHandleRename={() => handleRename(pokemon.id)} isLoadingButtonRename = {loadingButtonRename}/>
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
                    </>
                  )
                }
            </Container>
        </div>
        </>
    );
};

export default MyPokemon;
