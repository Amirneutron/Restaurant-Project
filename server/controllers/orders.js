var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var User = require('../models/user');


//list all orders
router.get('/', function (req, res, next) {
  Order.find(function (err, order) {
    if (err) { return next(err); }
    res.json({ 'orders': order });
  });
});

//Get a order with the given id
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Order.findById(id, function (err, order) {
    if (err) { return next(err); }
    if (order === null) {
      return res.status(404).json({ 'message': 'No Order found' });
    }
    res.json(order);
  });
});

//Create a new  order
/*router.post('/', function (req, res, next) {
  let userId = req.userId;
  User.findById(userId, function (err, user) {
    if (err) { return next(err); }
    if (user == null) {
      return res.status(404).json({ "message": "User not found" });
    }
    const order = new Order({
      userId: userId,
      quantity: req.body.quantity,
      products: req.body.productId
    });

    order.save().then(result => {
      console.log(result);
      res.status(201).json(order);

    }).catch(err => {
      console.log(err);
      res.status(404).json("User not found");
    });
  });
});*/

//Create a new  product
router.patch('/:id', function (req, res, next) {
  let orderId = req.id;

  console.log(req.body.product)
  Order.updateOne({ _id: orderId }, { $push: { products: req.body.product } }, function (err, order) {
    if (err) return next(err);
    if (order == null) return res.status(404).json({ 'message': 'Order not found' });

    res.status(200).json(order);
  }
  );
});

module.exports = router;