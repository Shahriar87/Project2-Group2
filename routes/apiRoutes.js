var db = require("../models");

module.exports = function (app) {

  // GET Category API
  app.get("/api/category", function (req, res) {
    db.Category.findAll({
      attributes: ["categoryName"]
    }).then(function (dbCategory) {
      res.json(dbCategory);
      // console.log(dbCategory);
    });
  });

  // GET Manufacturer API
  app.get("/api/manufacturer", function (req, res) {
    db.Manufacturer.findAll({
      attributes: ["manufacturerName"]
    }).then(function (dbManufacturer) {
      res.json(dbManufacturer);
      // console.log(dbManufacturer);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
