const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../config/configDb')

const Aluno = Sequelize.define(
    'Aluno',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },


        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'O nome deve ter no mínimo 3 caracteres e no máximo 50'
                },
                notNull: {
                    msg: 'O nome é Obrigatório'
                }
            }
        },


        notas: {
            type: DataTypes.FLOAT,
            validate: {
                min: {
                    args: 0,
                    msg: 'A nota minima é 0'
                },
                max: {
                    args: 100,
                    msg: 'A nota máxima é 100'
                },
                isFloat: {
                    msg: 'Digite um valor decimal!'
                }
            }
        },


        email: {
            type: DataTypes.STRING,
            unique: true,

            validate: {
                isEmail: {
                    msg: 'Digite um e-mail valido!'
                },
                notNull: {
                    msg: 'O E-mail é obrigatório!'
                }
            }
        },


        data_cadastro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },


        senha: {
            type: DataTypes.STRING,

            validate: {
                notEmpty: {
                    msg:'A senha não pode ser vazia!'
                },
                len: {
                    args: [7, 12],
                    msg: 'A senha deve conter no minimo 7 caracteres e no máximo 12'
                }
            }
        },
        sequelize,
        modelName: 'aluno',
        timestamps: false

    })

    module.exports = Aluno
