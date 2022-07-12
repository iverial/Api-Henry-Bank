const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Crypto',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      balance: {
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
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
