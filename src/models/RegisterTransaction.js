const DataTypes = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'RegisterTransaction',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      accountOrigin: {
        type: DataTypes.INTEGER,
      },
      amountOrigin: {
        type: DataTypes.DECIMAL,
      },
      accountDestiny: {
        type: DataTypes.INTEGER,
      },
      amountDestiny: {
        type: DataTypes.DECIMAL,
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
