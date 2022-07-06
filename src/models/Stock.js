const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'nombreTabla',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.INTEGER,
      },
      buy_price: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING,
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
