var express = require('express');
var router = express.Router();
var User = require('../models/user');
var md5 = require('md5');
var ordersController = require('./orders');

var productsController = require('./products');
var reviewsController = require('./reviews');

// Create a new user
router.post('/', function (req, res, next) {
  var newUser = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: md5(req.body.password)
  });

  newUser.save(function (err) {
    if (err) { return next(err); }
    res.status(201).json(newUser);
  });
});

// Return a list of all Users
router.get('/', function (req, res, next) {
  User.find(function (err, user) {
    if (err) { return next(err); }
    res.json({ 'users': user });
  });
});

// Login an existing User
router.get('/', function (req, res) {
  const email = req.body.email;
  const password = md5(req.body.password);
  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      console.log(err);
    }
    else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.json(foundUser);
        } else {
          return res.status(404).json({ 'message': 'Incorrect Password ' });
        }
      } else {
        return res.status(404).json({ 'message': 'Incorrect Email' });
      }
    }
  });

});

//update user info with a given id
router.patch('/:id', function (req, res, next) {
  var id = req.params.id;
  User.update({ _id: id }, { $set: req.body }, function (err, user) {
    if (err) { return next(err); }
    if (user == null) {
      return res.status(404).json({ 'message': 'User not found' });
    }
    res.json(user);
  });
});

// Update user password
router.patch('/:id/password', function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({ 'message': 'User not found' });
    }
    user.password = md5(req.body.password);
    user.save();
    res.json(user);
  }
  );
});

// Delete the user with the given ID
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id }, function (err, users) {
    if (err) { return next(err); }
    if (users === null) {
      return res.status(404).json({ 'message': 'Unsuccessful operation' });
    }
    res.json(users);
  });
});

//Return a user with the given id
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) { return next(err); }
    if (user === null) {
      return res.status(404).json({ 'message': 'No User found' });
    }
    res.json(user);
  });
});

//nested request
router.use('/:id/products/orders', function (req, res, next) {
  req.userId = req.params.id;
  next();
}, ordersController);

router.use('/:id/products', function (req, res, next) {
  req.userId = req.params.id;
  next();
}, productsController);

router.use('/:id/reviews', function (req, res, next) {
  req.userId = req.params.id;
  next();
}, reviewsController);

module.exports = router;

