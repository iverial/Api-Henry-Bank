const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Crypto', {
    hash: {
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
    buyPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    simbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
