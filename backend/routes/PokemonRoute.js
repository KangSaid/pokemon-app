import express from "express"
import {
    createPokemon,
    getPokemon,
    updateNickname
} from '../controllers/PokemonController.js';

const router = express.Router();

router.post('/pokemons', createPokemon);
router.get('/pokemons', getPokemon)
router.patch('/pokemons/:id',updateNickname)

export default router;