const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define(
        'Role',
        {
            role: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
    );
};
