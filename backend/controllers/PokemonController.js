import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createPokemon = async (req, res) => {
    const { pokemon_id, nickname } = req.body;

    try {

        //probalitiy 50% 
        const randomInteger = Math.floor((Math.random() * 10) + 1);
        const probality = randomInteger <= 5 ? true : false;

        const pokemon = probality && (await prisma.pokemon.create({
            data: {
                pokemon_id: pokemon_id,
                nickname: nickname,
            }
        }));

        const result = !pokemon ? { probality: probality, msg: "Oops, you fail catching this pokemon, please try again." } : { ...pokemon, probality: true }

        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPokemon = async (req, res) => {
    try {

        const pokemonCount = await prisma.pokemon.count()
        let result = { msg: 'no data' };

        if (pokemonCount != 0) {

            if (req.query.limit) return getPokemonPage(req, res, pokemonCount)
            
            const response = await prisma.pokemon.findMany({
                take: 2,
                orderBy: {
                    id: 'asc'
                }
            })

            result = {
                count: pokemonCount,
                results: response
            }
        }


        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const getPokemonPage = async (req, res, count) => {

    try {

        const offset = parseInt(req.query.offset)
        const limit = parseInt(req.query.limit)

        const response = await prisma.pokemon.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        })

        const result = { count: count, results: response }

        res.status(200).json(result)

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }

}
