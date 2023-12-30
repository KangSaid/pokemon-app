import express from "express"
import {
    createPokemon,
    getPokemon,
    updateNickname,
    releasePokemon
} from '../controllers/PokemonController.js';

const router = express.Router();

router.post('/pokemons', createPokemon);
router.get('/pokemons', getPokemon)
router.patch('/pokemons/:id',updateNickname)
router.delete('/pokemons/release/:id',releasePokemon)

export default router;