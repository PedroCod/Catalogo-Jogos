const Sequelize = require("sequelize");
const database = require("./../database");

const Jogos = database.define("jogos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: Sequelize.STRING,
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: Sequelize.STRING,
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Jogos;