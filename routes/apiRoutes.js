var db = require("../models");

module.exports = function (app) {

  // GET ALL CATEGORIES
  app.get("/company", function (req, res) {
    db.Category.findAll({
      attributes: ["categoryName"],
      raw: true
    }).then(function (data) {
      // res.json(dbCategory);
      var dbCategory = {
        dbCategory: data
      };
      console.log(dbCategory);
      res.render("companyPage", dbCategory);
    });
  });

  // GET ALL MANUFACTURER
  app.get("/company", function (req, res) {
    db.Manufacturer.findAll({
      attributes: ["manufacturerName"],
      raw: true
    }).then(function (data) {
      var dbManufacturer = {
        dbManufacturer: data
      };
      console.log(dbManufacturer);
      res.render("companyPage", dbManufacturer);
    });
  });

  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/company", function (req, res) {
    db.Category.findAll({
      attributes: ["categoryName"]
    }).then(function (dbCategory) {
      res.json(dbCategory);
      // console.log(dbCategory);

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
