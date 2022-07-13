const DataTypes = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'RegisterRecharge',
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
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      timestamp: true,
      createdAt: 'date',
      updatedAt: false,
    }
  );
};
