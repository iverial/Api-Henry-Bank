const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'RegisterCrypto',
    {
        account: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nameCrypto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      createdAt: 'date',
      updatedAt: false,
    }
 );
  
};
