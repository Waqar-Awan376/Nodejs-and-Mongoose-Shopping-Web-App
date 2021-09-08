const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const isAuth = require("../middleware/isAuth");
const isUserAuth = require("../middleware/isUserAuth");

router.get('/index', isAuth, isUserAuth, userController.getIndex);
router.get('/detail/:prodId', isAuth, isUserAuth, userController.getProductDetail);
router.post('/addToCart', isAuth, isUserAuth, userController.postAddToCart);
router.get('/cartItems', isAuth, isUserAuth, userController.getCartItems);


module.exports = router;
