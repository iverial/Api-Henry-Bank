const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'LockedStake',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      ror: {
        type: DataTypes.INTEGER,
      },
      parking: {
        type: DataTypes.INTEGER,
      },
      deposit: {
        type: DataTypes.INTEGER,
      },
      start_date: {
        type: DataTypes.INTEGER,
      },
      end_date: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
