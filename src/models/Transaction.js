const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'rejected',
    },
  });
};
