const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Nationality',
    {
     id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
     name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};