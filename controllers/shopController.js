const products=require('../models/product');

exports.getIndex=(req,res,next)=>
{
    products.find().then((allProducts)=>
    {
        res.render('shop/index',{
            prods:allProducts,
            pageTitle:'Home Page',
            path:'/'
        });
    }).catch(err=>console.log(err));
}

exports.getDetail=(req,res,next)=>
{
    let productId=req.params.prodId;
    products.findById(productId).then((product)=>
    {
        res.render('shop/prodDetail',{
            product:product,
            pageTitle:'Product Detail',
            path:'/'
        })
    }).catch(err=>console.log(err));
}