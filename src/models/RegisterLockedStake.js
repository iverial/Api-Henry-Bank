const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'RegisterLockedStake',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      account: {
        type: DataTypes.INTEGER,
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
