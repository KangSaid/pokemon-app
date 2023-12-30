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
                take: 20,
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

export const updateNickname = async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const data = await prisma.pokemon.findUnique({
            where: {
                id: id
            }
        })

        const nickname = data?.nickname
        const fib = data?.fib == null ? 1 : (data.fib + 1)
        let fibAngka = 0

        switch (fib) {
            case 1:
                fibAngka = 0
                break;
            case 2:
                fibAngka = 1
                break;
            case 3:
                fibAngka = 1
                break;
            default:
                fibAngka = fib - 2
                break;
        }

        if (fib > 3) {
            fibAngka = fibonacci(fibAngka)
        }

        const response = await prisma.pokemon.update({
            where: {
                id: id
            },
            data: {
                fib: fib,
                fib_nickname: nickname + '-' +  fibAngka
            }
        })

        res.status(200).json(response)

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

const fibonacci = (num) => {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

