const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'LockedStake',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      account: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roi: {
        type: DataTypes.STRING,
      },
      parking: {
        type: DataTypes.STRING,
      },
      deposit: {
        type: DataTypes.DECIMAL,
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
