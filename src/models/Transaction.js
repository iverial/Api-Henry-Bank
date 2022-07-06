const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
