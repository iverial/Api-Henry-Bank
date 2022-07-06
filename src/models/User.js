const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUIDV4,
      },
      dni:{
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
      email:{
        type: DataTypes.STRING,
      },
      password:{
        type: DataTypes.STRING,
      },
      pin:{
        type: DataTypes.INTEGER,
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
