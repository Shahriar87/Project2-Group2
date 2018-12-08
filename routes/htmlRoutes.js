var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Christmas Toy Store",
        examples: dbExamples
      });
    });
  });

  // LOAD COMPANY PAGE
  // GET ALL CATEGORIES
  app.get("/company", function (req, res) {
    db.Category.findAll({
      raw: true
    }).then(function (dbCategory) {
      // GET ALL MANUFACTURER
      db.Manufacturer.findAll({
        raw: true
      }).then(function (dbManufacturer) {
        // GET ALL TOYS
        db.Toy.findAll({
          attributes: [
            "id", "toyName", "price",
            "unitStock", "image"
          ],
          raw: true
        }).then(function (dbToy) {
          var dbStuff = {
            dbCategory,
            dbManufacturer,
            dbToy,
            msg: "Christmas Toy Store"
          };
          // console.log(dbStuff);
          // console.log(dbToy);
          res.render("companyPage", dbStuff);
        });
      });
    });
  });

  // LOAD CUSTOMER PAGE
  app.get("/customer", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("customerPage", {
        msg: "Christmas Toy Store"
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
