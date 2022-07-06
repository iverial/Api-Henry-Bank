const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Account',
    {
      id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true, 
      },
      cbu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contacts: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },

      risk: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'low',
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
