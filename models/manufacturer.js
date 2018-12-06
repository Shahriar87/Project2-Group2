module.exports = function (sequelize, DataTypes) {
    var Manufacturer = sequelize.define("Manufacturer", {
        manufacturerName: DataTypes.STRING,
    }, {
        freezeTableName: true,          // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
      });

      Manufacturer.associate = function(models) {
        // ASSOCIATING MANUFACTURER WITH TOY
        Manufacturer.hasMany(models.Toy, {
          onDelete: "cascade"
        });
      };
      
    return Manufacturer;
};