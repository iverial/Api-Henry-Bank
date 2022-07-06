const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('InvestTransaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buy',
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },

    amount_invested: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
