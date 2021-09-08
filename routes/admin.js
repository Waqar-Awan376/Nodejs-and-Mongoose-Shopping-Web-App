const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const isAuth = require("../middleware/isAuth");
const isAdminAuth = require("../middleware/isAdminAuth");

router.get('/index', isAuth, isAdminAuth, adminController.getIndex);
router.get('/users', isAuth, isAdminAuth, adminController.getUsers);
router.get('/addProduct', isAuth, isAdminAuth, adminController.getAddProduct);
router.post('/addProduct', isAuth, isAdminAuth, adminController.postAddProduct);
router.get('/updateProduct/:prodId', isAuth, isAdminAuth, adminController.getUpdateProduct);
router.post('/updateProduct', isAuth, isAdminAuth, adminController.postUpdateProduct);
router.get('/detail/:prodId', isAuth, isAdminAuth, adminController.getProductDetail);
router.get('/deleteProduct/:prodId', isAuth, isAdminAuth, adminController.getDeleteProduct);
router.get('/deleteUser/:userId', isAuth, isAdminAuth, adminController.getDeleteUser)



module.exports = router;
