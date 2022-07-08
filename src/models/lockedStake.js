const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'LockedStake',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoincrement: true,
      },
      roi: {
        type: DataTypes.STRING,
      },
      parking: {
        type: DataTypes.STRING,
      },
      deposit: {
        type: DataTypes.INTEGER,
      },
      start_date: {
        type: DataTypes.STRING,
      },
      end_date: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
  );
};
