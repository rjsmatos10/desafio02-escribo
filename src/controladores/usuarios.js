const jwt = require("jsonwebtoken")
const knex = require("../conexao")
const bcrypt = require("bcrypt")
const senhajwt = require("../senhajwt")

const cadastrarUsuario = async (req , res) => {
    const {nome, email , senha , telefones} = req.body

    if(!nome){
        return res.status(404)
        .json({mensagem: "É necessario preencher todos os campos!"})
    }

    if(!email){
        return res.status(404)
        .json({mensagem: "É necessario preencher todos os campos!"})
    }

    if(!senha){
        return res.status(404)
        .json({mensagem: "É necessario preencher todos os campos!"})
    }

    if(!telefones){
        return res.status(404)
        .json({mensagem: "É necessario preencher todos os campos!"})
    }

    try {

       const emailExiste = await knex('usuarios').where({ email }).first()

       if (emailExiste) {
        return res.status(400).json('O email já existe')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const numerofinal = telefones.map((item) => {
            return `${item.ddd}${item.numero}`
        } ).join(";")
    

		let user = await knex('usuarios')
			.insert({
				nome,
				email,
				senha: senhaCriptografada,
				telefones: numerofinal,
			})
            .returning("*")

        user = user[0]

        const token = jwt.sign({id: user.id}, senhajwt, {expiresIn: "30m"})

        if(!user){
            return res.status(400).json({mensagem: "O usuario não foi cadastrado."})
        }
  
        const bodyresposta = {
            id: user.id,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login || null,
            token,
        }

        return res.status(201).json(bodyresposta)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}

const obterUsuario = async (req, res) => {
    return res.status(200).json(req.usuario)
}





module.exports = {
    cadastrarUsuario,
    obterUsuario,
}