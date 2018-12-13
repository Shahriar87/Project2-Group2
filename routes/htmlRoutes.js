var db = require("../models");

var path = require("path");

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

  // LOAD TOY PURCHASE PAGE
  app.get("/customer/:id/toy/:id", function (req, res) {
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
      res.render("toyPurchase", {
        dbToy,
        msg: "Christmas Toy Store"
      });
    });
  });

  // LOAD TOY DESCRIPTION PAGE
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

  // LOAD ORDER PAGE
  app.get("/order/customer/toy/:id", function (req, res) {
    db.Toy.findOne({
      attributes: [
        "id", "toyName", "price", "unitStock"
      ],
      where: { id: req.params.id },
      raw: true
    }).then(function (dbToy) {
      res.render("orderPage", {
        dbToy,
        msg: "Christmas Toy Store"
      });
    });
  });

  // LOAD RECEIPT PAGE
  app.get("/orderConfirm", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/orderSummary.html"));
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
