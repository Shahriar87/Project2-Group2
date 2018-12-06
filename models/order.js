module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        quantity: DataTypes.INTEGER
    }, {
            freezeTableName: true,          // Model tableName will be the same as the model name
            timestamps: false,
            underscored: true
        });

    Order.associate = function (models) {
        // Toy should belong to an Manufacturer 
        Order.belongsTo(models.Toy, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Order;
};