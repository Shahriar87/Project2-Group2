module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        categoryName: DataTypes.STRING,
    }, {
        freezeTableName: true,          // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
      });
    return Category;
};
