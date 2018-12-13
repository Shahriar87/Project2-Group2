var db = require("../models");

var sequelize = require('sequelize');

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


  // PUT ROUTE FOR UPDATING TOYS
  app.put("/api/toys/:id", function (req, res) {
    db.Toy.update({
      unitStock: sequelize.literal('unitStock +' + req.body.unitStock)
    }, {
        where: {
          id: req.params.id
        }
      }).then(function (dbToy) {
        console.log(dbToy);
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

  // GET ROUTE FOR TOY RECOMMENDATION BASED ON PREVIOUS VISIT
  app.get("/api/toy", function (req, res) {
    db.user.findOne({
      attributes: [
        "id", "Q1", "Q2", "Q3", "Q4", "Q5", "createdAt", "updatedAt"
      ],
      where: { id: req.user.id },
      raw: true
    }).then(function (dbUser) {
      db.Toy.findAll({
        raw: true
      }).then(function (dbToy) {
        // THE ALGORITHM FOR TOY RECOMMENDATION
        var recommendedToyScore = dbUser;
        var recommendArray = [];
        var index;

        // console.log("================");
        // console.log(dbUser);
        // console.log(dbToy);
        // console.log("================");


        for (var j = 0; j < 3; j++) {
          var counterScore = 25;
          var closestToy;


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

        var dbStuff = {
          dbUser,
          recommendArray: recommendArray
        }
        // console.log(recommendArray);
        res.json(dbStuff);
      })
    });
  });


  // POST ROUTE FOR TOY RECOMMENDATION
  app.post("/api/toy", function (req, res) {
    db.user.findOne({
      attributes: [
        "id"
      ],
      where: { id: req.user.id },
      raw: true
    }).then(function (dbUser) {
      db.Toy.findAll({
        raw: true
      }).then(function (
        dbToy
      ) {
        // THE ALGORITHM FOR TOY RECOMMENDATION

        var recommendedToyScore = req.body;
        var recommendArray = [];
        var index = -1;

        // console.log(dbToy[1].Q1)
        // console.log(req.body.Q1);

        for (var j = 0; j < 3; j++) {
          var counterScore = 25;
          var closestToy;

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

        var dbStuff = {
          dbUser,
          recommendArray: recommendArray
        }
        // console.log(recommendArray);
        res.json(dbStuff);
      })
    });
  });

  // PUT ROUTE FOR USER PREFERENCE SAVING
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

  // ORDER PAGE API
  app.get("/api/all", function (req, res) {
    db.Order.findAll({}).then(function (results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

  app.get("/api/last", function (req, res) {
    db.Order.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(function (results) {
      //only difference is that you get users list limited to 1
      //entries[0]
      res.json(results);
    });
  });

  app.post("/api/new", function (req, res) {

    // console.log("Orders Data:");
    // console.log(req.body);

    db.Order.create({
      ToyName: req.body.ToyName,
      ToyQuantity: req.body.ToyQuantity,
      price: req.body.price,
      totalCost: req.body.ToyQuantity * req.body.price,
      createdAt: req.body.createdAt
    }).then(function (results) {
      // `results` here would be the newly created chirp
      res.end();
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


}