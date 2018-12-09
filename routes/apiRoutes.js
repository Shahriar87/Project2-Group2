var db = require("../models");

module.exports = function (app) {

  // GET Category API
  app.get("/api/category", function (req, res) {
    db.Category.findAll({
    }).then(function (dbCategory) {
      res.json(dbCategory);
      console.log("Category: " + dbCategory);
    });
  });

  // GET Manufacturer API
  app.get("/api/manufacturer", function (req, res) {
    db.Manufacturer.findAll({
    }).then(function (dbManufacturer) {
      res.json(dbManufacturer);
      // console.log(dbManufacturer);
    });
  });

  // GET Toy API
  app.get("/api/toys", function (req, res) {
    db.Toy.findAll({
      //   attributes: [
      //     "toyName", "toyDescription", "price", 
      //   "unitStock", "image", "rating", "ageAbove", 
      //   "Q1", "Q2", "Q3", "Q4", "Q5"
      // ]
    }).then(function (dbToy) {
      res.json(dbToy);
      // console.log(dbToy);
    });
  });

    // POST ROUTE FOR SAVING NEW TOY
  app.post("/api/toys", function (req, res) {
    console.log(req.body);
    db.Toy.create(req.body).then(function (dbToy) {
      // console.log("new Toy added: " + res)
      // console.log(dbToy)
      res.json(dbToy);
    });
  });

  // POST ROUTE FOR SAVING NEW CATEGORY
  app.post("/api/category", function (req, res) {
    console.log(req.body);
    db.Category.create(req.body).then(function (dbCate) {
      res.json(dbCate);
    });
  });

  // POST ROUTE FOR SAVING NEW MANUFACTURER
  app.post("/api/manufacturer", function (req, res) {
    console.log(req.body);
    db.Manufacturer.create(req.body).then(function (dbManu) {
      res.json(dbManu);
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
