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

  // GET TOY API
  app.get("/api/toys", function (req, res) {
    db.Toy.findAll({
    }).then(function (dbToy) {
      res.json(dbToy);
    })
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

  // POST ROUTE FOR TOY RECOMMENDATION
  app.post("/api/toy", function (req, res) {
    db.Toy.findAll({
      raw: true
    }).then(function (
      dbToy
    ) {

      // THE ALGORITHM FOR TOY RECOMMENDATION

      var recommendedToyScore = req.body;
      var recommendArray = [];

      // console.log(dbToy[1].Q1)
      // console.log(req.body.Q1);

      for (var j = 0; j < 3; j++) {
        var counterScore = 25;
        var closestToy;
        var index = -1;

        for (var i = 0; i < dbToy.length; i++) {

          var currentToyQ1 = dbToy[i].Q1;
          var currentToyQ2 = dbToy[i].Q2;
          var currentToyQ3 = dbToy[i].Q3;
          var currentToyQ4 = dbToy[i].Q4;
          var currentToyQ5 = dbToy[i].Q5;
          var totalScore = 0;

          totalScore = Math.abs(currentToyQ1 - recommendedToyScore.Q1)
            + Math.abs(currentToyQ2 - recommendedToyScore.Q2)
            + Math.abs(currentToyQ3 - recommendedToyScore.Q3)
            + Math.abs(currentToyQ4 - recommendedToyScore.Q4)
            + Math.abs(currentToyQ5 - recommendedToyScore.Q5)

          if (totalScore <= counterScore) {
            counterScore = totalScore;
            closestToy = dbToy[i];
            index = i;
          }
        }
        recommendArray.push(closestToy);
        dbToy.splice(index, 1);
      }
      // console.log(recommendArray);
      res.json(recommendArray);
    })
  });

  // POST ROUTE FOR USER PREFERENCE SAVING
  app.put("/api/user", function (req, res) {
    console.log(req.body);
    db.user.update({
      Q1: req.body.Q1,
      Q2: req.body.Q2,
      Q3: req.body.Q3,
      Q4: req.body.Q4,
      Q5: req.body.Q5,
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbUser) {
        res.json(dbUser);
      })
  });






  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });


}