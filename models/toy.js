module.exports = function (sequelize, DataTypes) {
    var Toy = sequelize.define("Toy", {
        toyName: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                len: [1]
            }
        },
        toyDescription: {
            type: DataTypes.TEXT,
            // allowNull: false,
            len: [1]
        },
        price: DataTypes.DECIMAL(13, 2),
        unitStock: DataTypes.INTEGER,
        image: {
            type: DataTypes.TEXT,
            // allowNull: false,
            // isUrl: true
        },
        rating: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        },
        ageAbove: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        Q1: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        },
        Q2: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        },
        Q3: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        },
        Q4: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        },
        Q5: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            validate: { min: 1, max: 5 }
        }
    }, {
            freezeTableName: true,          // Model tableName will be the same as the model name
            timestamps: false,
            underscored: true
        });

    Toy.associate = function (models) {
        // TOY SHOULD BELONG TO A MANUFACTURER
        Toy.belongsTo(models.Manufacturer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Toy.associate = function (models) {
        // TOY SHOULD BELONG TO A CATEGORY
        Toy.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Toy.associate = function (models) {
        // ASSOCIATING TOY WITH ORDER
        Toy.hasMany(models.Order, {
            
        });
    };

    return Toy;
};