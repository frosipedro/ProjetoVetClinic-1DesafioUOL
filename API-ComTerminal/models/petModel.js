// Modelo para Pets
const { Sequelize } = require('sequelize')
const db = require('../config/database')

const petModel = db.define(
  'Pet',
  {
    name: Sequelize.STRING,
    species: Sequelize.STRING,
    carry: Sequelize.STRING,
    weight: Sequelize.FLOAT,
    date_of_birth: Sequelize.DATEONLY,
    tutorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tutor',
        key: 'id',
      },
    },
  },
  {
    tableName: 'Pets',
    timestamps: false,
  }
)

// Estabelecendo relacionamento entre modelos
const tutorModel = require('./tutorModel')
tutorModel.hasMany(petModel, {
  foreignKey: 'tutorId',
  as: 'pets',
})
petModel.belongsTo(tutorModel, {
  foreignKey: 'tutorId',
  as: 'tutor',
})

module.exports = petModel
