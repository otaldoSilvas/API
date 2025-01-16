const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../../../config/configDb");

const Aluno = sequelize.define(
  "Aluno",
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
          msg: "O nome deve ter no mínimo 3 caracteres e no máximo 50",
        },
        notNull: {
          msg: "O nome é obrigatório!",
        },
      },
    },
    notas: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [0],
          msg: "A nota minima é zero",
        },
        max: {
          args: [100],
          msg: "A nota maxima é 100",
        },
        isFloat: {
          msg: "Deve ser um número decimal!",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O nome é obrigatório!",
        },
        isEmail: {
          msg: "Forneça um e-mail válido!",
        },
      },
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A senha não pode ser vazia!",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate:
        async (usuario) => {
          if (usuario.senha) {
            if (usuario.senha.length < 8 || usuario.senha.length > 15) {
              throw new Error('A senha deve ser maior que 8 e menor que 15')
            }
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
          }
        },
      beforeUpdate:
        async (usuario) => {
          if (usuario.changed('senha')) {
            if (usuario.senha.length < 8 || usuario.senha.length > 15) {
              throw new Error('A senha deve ser maior que 8 e menor que 15')
            }
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
          }
        }
    },
      sequelize,
      modelName: "aluno",
      timestamps: false
    
  });
module.exports = Aluno;
