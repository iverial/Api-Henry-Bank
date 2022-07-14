const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'RegisterLockedStake',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roi: {
        type: DataTypes.STRING,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parking: {
        type: DataTypes.STRING,
      },
      deposit: {
        type: DataTypes.INTEGER,
      },
      end_date: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamp: true,
      createdAt: 'start_date',
      updatedAt: false,
    }
  );
};