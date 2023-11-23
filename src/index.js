const express = require("express")
const knex = require("./conexao")


const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const usuarios = await knex(usuarios)
    return res.json(usuarios)
})

app.listen(3000)    