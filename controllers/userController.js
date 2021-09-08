const products = require('../models/product');
const users = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

exports.getIndex = (req, res, next) => {
    products.find().then((allProducts) => {
        res.render('user/index', {
            prods: allProducts,
            pageTitle: 'Home',
            path: '/user/index'
        });
    }).catch(err => console.log(err));
}

exports.getProductDetail = (req, res, next) => {
    let productId = req.params.prodId;
    products.findById(productId).then((foundProduct) => {
        res.render('user/productDetail', {
            product: foundProduct,
            pageTitle: 'Product Detail',
            path: '/user/index'
        })
    }).catch(err => console.log(err));
}

exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.productId;
    products.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/user/index');
        });
}

exports.getCartItems = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(products);
            res.render('user/cart', {
                path: '/user/cartItems',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
}