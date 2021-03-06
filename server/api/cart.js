const router = require('express').Router();
const Carts = require('../models/cart');
const Users = require('../models/users');
const Products = require('../models/products');



// matches GET requests to /api/cart/
router.get('/:userId', function (req, res, next){

  Carts.findAll({
    where: {userId: req.session.userId},
    include:[{Users}, {Products}]

  })
  .then(cartFound => {
    res.send(cartFound)
  })
  .catch(next)
});

// The following is not being used and most likely will be removed to avoid permissions issues

// // matches POST requests to /api/carts/
// router.post('/', function (req, res, next){
//   Carts.create(req.body)
//   .then(cartCreated => res.send(cartCreated))
//   .catch(next)
// });

// // matches PUT requests to /api/carts/:cartId
// router.put('/:cartId', function (req, res, next){
//   req.cart.update(req.body)
//   .then(cartUpdated => res.send(cartUpdated))
//   .catch(next)
// });

// // matches DELTE requests to /api/carts/:cartId
// router.delete('/:cartId', function (req, res, next){
//   req.cart.destroy(req.body)
//   .then(() => {
//     res.sendStatus(204)
//   })
// });

module.exports = router
