module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        
        ToyName: {
            type: DataTypes.STRING
        },
        
        price: {
            type: DataTypes.DECIMAL(13, 2)
        },
        ToyQuantity: {
            type: DataTypes.INTEGER
        },
        totalCost: {
            type: DataTypes.DECIMAL(13, 2)
        }
    }, {
            freezeTableName: true,          // Model tableName will be the same as the model name
            timestamps: true,
            underscored: false
        });

    // Order.associate = function (models) {
    //     // Order should belong to an Toy
    //     Order.belongsTo(models.Toy, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     });
    // };

    // Order.associate = function (models) {
    //     // Order should belong to an User
    //     Order.belongsTo(models.user, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Order;
};