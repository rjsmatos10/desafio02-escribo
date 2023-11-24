const knex = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')

const verificaLogin = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json('Não autorizado')
	}

	try {
		const token = authorization.replace('Bearer ', '').trim()

		const { id } = jwt.verify(token, senhajwt)

		const usuarioEncontrado = await knex('usuarios').where({ id }).first()

		if (!usuarioEncontrado) {
			return res.status(404).json({mensagem:'Usuario não encontrado'})
		}

		const { senha, ...usuario } = rows[0]

		req.usuario = usuario

		next()
	} catch (error) {
		return res.status(500).json({mensagem:'Erro interno do servidor'})
	}
}

module.exports = verificaLogin