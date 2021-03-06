const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'SavingAccount',
    {
     id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
     ars: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      
      },
     usd:{
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: {
          min: 0,
        }
     },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};