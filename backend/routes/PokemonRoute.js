import express from "express"
import {
    createPokemon,
    getPokemon
} from '../controllers/PokemonController.js';

const router = express.Router();

router.post('/pokemons', createPokemon);
router.get('/pokemons', getPokemon)

export default router;