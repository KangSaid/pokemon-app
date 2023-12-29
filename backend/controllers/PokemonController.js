import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createPokemon = async (req, res) => {
    const { pokemon_id, nickname } = req.body;

    try {
        
        //probalitiy 50% 
        const randomInteger = Math.floor((Math.random() * 10) + 1);
        const probality = randomInteger <= 5 ? true : false;

        const pokemon = probality && (await prisma.pokemon.create({
            data : {
                pokemon_id: pokemon_id,
                nickname: nickname,
            }
        })); 

        const result = !pokemon ? { probality: probality, msg: "Oops, you can't catching this pokemon" } : {...pokemon, probality: true} 

        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({error : error})
    }
}