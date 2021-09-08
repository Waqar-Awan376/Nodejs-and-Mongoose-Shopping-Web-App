const products = require('../models/product');
const users = require('../models/user');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
    products.find().then((allProducts) => {
        res.render('admin/index', {
            prods: allProducts,
            pageTitle: 'All Products',
            path: '/admin/products'
        });
    }).catch(err => console.log(err));
}

exports.getUsers = (req, res, next) => {
    users.find({ role: 'user' }).then((allUsers) => {
        res.render('admin/users', {
            users: allUsers,
            pageTitle: 'All Users',
            path: '/admin/users'
        });
    }).catch(err => console.log(err));
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/addProduct', {
        pageTitle: 'All Users',
        path: '/admin/addProduct'
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.prod_title;
    const image = req.file;
    const imageUrl = image.path;
    const price = req.body.prod_price;
    const description = req.body.prod_description;

    const newProduct = new products({
        title: title,
        price: price,
        description: description,
        imageURL: imageUrl,
    });
    newProduct.save().then(result => {
        res.redirect('/admin/index');
    }).catch(err => console.log(err));
}

exports.getUpdateProduct = (req, res, next) => {
    let productId = req.params.prodId;
    products.findById(productId).then(product => {
        res.render('admin/updateProduct',
            {
                product: product,
                pageTitle: 'Update Product',
                path: '/admin/updateProduct'
            });
    }).catch(err => console.log(err));
}

exports.postUpdateProduct = (req, res, next) => {
    let productId = mongoose.Types.ObjectId(req.body.prodId);
    products.findById(productId).then((foundProduct) => {
        foundProduct.title = req.body.prod_title;
        foundProduct.price = req.body.prod_price;
        foundProduct.description = req.body.prod_description;
        foundProduct.imageURL = req.file.path;
        return foundProduct.save();
    }).then((result) => {
        res.redirect('/admin/index');
    }).catch(err => console.log(err));
}

exports.getProductDetail = (req, res, next) => {
    let productId = req.params.prodId;
    products.findById(productId).then((product) => {
        res.render('admin/productDetail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/admin/index'
        })
    }).catch(err => console.log(err));
}

exports.getDeleteProduct = (req, res, next) => {
    let productId = req.params.prodId;
    products.findByIdAndRemove(productId).then(() => {
        res.redirect('/admin/index');
    }).catch(err => console.log(err));
}

exports.getDeleteUser = (req, res, next) => {
    let userId = req.params.userId;
    users.findByIdAndRemove(userId).then(() => {
        res.redirect('/admin/users');
    }).catch(err => console.log(err));
}