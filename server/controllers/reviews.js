var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var User = require('../models/user');

//Get Reviews
router.get('/', function (req, res, next) {
  return Review.find(function (err,reviews) {
  }).populate('reviewer','fName lName').exec((err, reviews) => {
    if(err) return next(err);
    console.log();
    res.json(reviews);
  });
});

// Create a new Review for a specific restaurant
router.post('/', function (req, res, next) {
  let userId = req.userId;
  var newReview = new Review({
    reviewer: userId,
    date: Date.now(),
    rating: req.body.rating,
    comment: req.body.comment
  });
  newReview.save(function (err) {
    if (err) { return next(err); }
    res.status(201).json(newReview);
  });
});


//Delete a Specific Review
router.delete('/:id', function (req, res, next) {
  let userId = req.userId;
  var id = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (user === null) {
      return res.status(404).json({ 'message': ' User not found' });
    }
    Review.findOneAndDelete({ _id: id }, function (err, reviews) {
      if (err) { return next(err); }
      if (reviews === null) {
        return res.status(404).json({ 'message': 'Review not found' });
      }
      res.json(reviews);
    });
  });
});

//Edit a review
router.patch('/:id', function (req, res, next) {
  var id = req.params.id;
  Review.update({ _id: id }, { $set: req.body }, function (err, review) {
    if (err) { return next(err); }
    if (review == null) {
      return res.status(404).json({ 'message': 'Review not found' });
    }
    res.json(review);
  });

});

module.exports = router;