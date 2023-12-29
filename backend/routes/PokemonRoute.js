import express from "express"
import {
    createPokemon 
} from '../controllers/PokemonController.js';

const router = express.Router();

router.post('/pokemons', createPokemon);

export default router;