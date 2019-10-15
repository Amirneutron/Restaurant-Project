var express = require('express');
var router = express.Router();
var md5 = require('md5');
var User = require('../models/user');
var Admin = require('../models/admin');

var productsController = require('./products');
var reviewsController = require('./reviews');
var ordersController = require('./orders');

// Create a new admin
router.post('/register', function (req, res, next) {
  var newAdmin = new Admin({
    email: req.body.email,
    password: md5(req.body.password)
  });
  newAdmin.save(function (err) {
    if (err) { res.status(404).json({ 'message': 'Email already exists ' }); }
    res.status(201).json(newAdmin);
  });
});

// Login an existing Admin
router.post("/login", function (req, res) {
  const adminEmail = req.body.email;
  const adminPassword = md5(req.body.password);
  Admin.findOne({ email: adminEmail }, function (err, foundAdmin) {
    if (err) {
      console.log(err);
    }
    else {
      if (foundAdmin) {
        if (foundAdmin.password === adminPassword) {
          console.log("You are Logged In with " + foundAdmin.email);
          res.json(foundAdmin);
        } else {
          return res.status(404).json({ 'message': 'Incorrect Password ' });
        }
      } else {
        return res.status(404).json({ 'message': 'Incorrect Email' });
      }
    }
  });
});
//Delete the admin
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  Admin.findOneAndDelete({ _id: id }, function (err, admin) {
    if (err) { return next(err); }
    if (admin === null) {
      return res.status(404).json({ 'message': 'Admin not found' });
    }
    res.json(admin);
  });
});

// Return a list of all Users
router.get('/users', function (req, res, next) {
  User.find(function (err, user) {
    if (err) { return next(err); }
    res.json({ 'users': user });
  });
});

// Delete the user with the given ID
router.delete('/users/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id }, function (err, users) {
    if (err) { return next(err); }
    if (users === null) {
      return res.status(404).json({ 'message': 'Unsuccessful operation' });
    }
    res.json(users);
  });
});

// Update password of a Admin by ID
router.patch('/:id', function (req, res, next) {
  var id = req.params.id;
  Admin.findById(id, function (err, admin) {
    if (err) {
      return next(err);
    }
    if (admin == null) {
      return res.status(404).json({ 'message': 'Admin not found' });
    }
    admin.password = md5(req.body.password);
    admin.save();
    res.json(admin);
  }
  );
});

router.use('/:id/products', function (req, res, next) {
  req.adminId = req.params.id;
  next();
}, productsController);

router.use('/:id/reviews', function (req, res, next) {
  req.adminId = req.params.id;
  next();
}, reviewsController);

router.use('/:id/orders', function (req, res, next) {
  req.adminId = req.params.id;
  next();
}, ordersController);

module.exports = router;
