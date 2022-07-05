const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      dni: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      dateOfBirth:{
        type: DataTypes.DATE,
      },
      city: {
        type: DataTypes.STRING,
      },
      nationality: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      pin: {
        type: DataTypes.INTEGER
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
