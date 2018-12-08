module.exports = function (sequelize, DataTypes) {
    var Manufacturer = sequelize.define("Orders", {
        manufacturerName: DataTypes.STRING,
    }, {
        freezeTableName: true,          // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
      });
    return Manufacturer;
};