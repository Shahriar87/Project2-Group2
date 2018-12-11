var db = require("../models");

module.exports = function (app) {

  var passport = require('passport')

  // LOAD INDEX PAGE
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
  app.get("/customer/:id", isLoggedIn, function (req, res) {
    db.user.findOne({
      attributes: [
        "id", "firstname", "lastname"
      ],
      where: { id: req.user.id },
      raw: true
    }).then(function (dbUser) {
      // console.log("===========" + req.user);
      res.render("customerPage", {
        dbUser,
        msg: "Christmas Toy Store"
      });
    });
  });

  // LOAD TOY PAGE
  app.get("/toy/:id", function (req, res) {
    db.Toy.findOne({
      attributes: [
        "id", "toyName", "toyDescription", "price", "ageAbove",
        "rating", "unitStock", "image"
      ],
      where: { id: req.params.id },
      raw: true
    }).then(function (
      dbToy
    ) {
      // console.log(dbToy);
      res.render("toyDescription", {
        dbToy,
        msg: "Christmas Toy Store"
      });
    });
  });

  // SEQUELIZE PASSPORT CODES:
  // LOAD SIGNUP PAGE
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // LOAD SIGNIN PAGE
  app.get("/signin", function (req, res) {
    res.render("signin");
  });

  // POST TO SIGNUP PAGE
  app.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/signup'
  }), function (req, res) {
    res.redirect('/customer/' + req.user.username);
  });

  // // LOAD DASHBOARD PAGE
  // app.get("/dashboard", isLoggedIn, function (req, res) {
  //   res.render("dashboard");
  // });

  // LOGOUT
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

  // SIGN IN
  app.post('/signin', passport.authenticate('local-signin', {
    failureRedirect: '/signin'
  }), function (req, res) {
    res.redirect('/customer/' + req.user.username);
  });


  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // RENDER 404 FOR UNMATCHED ROUTE 
  app.get("*", function (req, res) {
    res.render("404");
  });

  // PROTECT THE LOGGED IN PAGE
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
};
