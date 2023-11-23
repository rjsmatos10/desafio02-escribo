const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : '020517',
      database : 'desafio02escribo'
    }
  });

module.exports = knex