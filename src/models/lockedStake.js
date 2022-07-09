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
      end_date: {
        type: DataTypes.STRING,
      },
      name: {
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
