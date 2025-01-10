const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/configDb");

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
        len: {
          args: [7, 12],
          msg: "O nome deve ter no mínimo 7 caracteres e no máximo 12",
        },
        notEmpty: {
          msg: "A senha não pode ser vazia!",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "aluno",
    timestamps: false,
  }
);
module.exports = Aluno;
