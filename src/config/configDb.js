const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const db = new Sequelize({

    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,

})

module.exports = db