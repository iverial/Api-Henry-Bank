const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'nombreTabla',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
