const jwt = require("jsonwebtoken")
const knex = require("../conexao")
const bcrypt = require("bcrypt")
const senhajwt = require("../senhajwt")

const login = async (req, res) => {
    const { email, senha } = req.body

	if (!email || !senha) {
		return res.status(404).json('É obrigatório email e senha')
	}

	try {
		let usuario = await knex('usuarios').where({ email }).first()

		if (!usuario) {
			return res.status(404).json('O usuario não foi encontrado')
		}

		const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

		if (!senhaCorreta) {
			return res.status(400).json('Email e senha não confere')
		}

		const token = jwt.sign({ id: usuario.id }, senhajwt, { expiresIn: '30m' })


        let ultimo_login = new Date()

        let user = await knex('usuarios')
        .where({id: usuario.id})
        .update({
            ultimo_login,
        }, ['id', 'data_criacao', 'data_atualizacao','ultimo_login'])
        

        const respostaBody = {
            ...user[0],
            token
        }

		return res.status(200).json(respostaBody)
	} catch (error) {
		return res.status(400).json(error.message)
	}
}

module.exports = {
	login,
}
