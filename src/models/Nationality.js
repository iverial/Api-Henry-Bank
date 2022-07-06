const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Nationality',
    {
     id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
     name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};