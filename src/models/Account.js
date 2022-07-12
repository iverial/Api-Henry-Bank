const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Account',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cbu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 16]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 16]
        }
      },
      contacts: {
        type: DataTypes.JSON,
        allowNull: false,
        validate:{
          isEmail : true
      }
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        }
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
