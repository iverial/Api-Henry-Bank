module.exports = (sequelize) => {
  sequelize.define('investTransaction', {
    id: {
      type: sequelize.UUID,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4,
    },
    date: {
      type: sequelize.DATE,
      allowNull: false,
    },
    type: {
      type: sequelize.STRING,
      allowNull: false,
      defaultValue: 'buy',
    },
    amount: {
      type: sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },

    amount_invested: {
      type: sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
