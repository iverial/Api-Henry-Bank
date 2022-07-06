const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'account',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
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
