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
        type: DataTypes.STRING,
      },
      amountOrigin: {
        type: DataTypes.STRING,
      },
      accountDestiny: {
        type: DataTypes.STRING,
      },
      amountDestiny: {
        type: DataTypes.STRING,
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
