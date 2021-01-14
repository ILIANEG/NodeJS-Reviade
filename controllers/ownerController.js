const { Product } = require('../models/Product');
const jwt = require('jsonwebtoken');
const { currentUserId } = require('../middleware/authentificator');
const User = require('../models/User');
const crypto = require('crypto-js');

module.exports.home_get = (req, res) => {
    res.render('main', {title: 'Main'});
}

module.exports.products_get = async (req, res) => {
    try {
        const thisUserId = currentUserId(req);
        const thisUser = await User.findById(thisUserId).populate('products');
        res.status(201).render('manageProducts', { title:'Manage Products', products : thisUser.products });
    } catch {
        res.status(400)
    }
}

module.exports.products_add_get = (req, res) => {
    res.render('getProduct', {title:'Add Product'});
}

module.exports.products_add_post = async (req, res) => {
    const { productName, productDescription } = req.body;
    try {
        const newProduct = await Product.create({productName, productDescription});
        const currentUser = await User.findById(currentUserId(req));
        const currentProducts = currentUser.products;
        currentProducts.push(newProduct.id);
        await User.findByIdAndUpdate(currentUserId(req), {products: currentProducts});
        res.status(201).json({ message:'success' });
    } catch {
        res.status(400);
    }
}

module.exports.products_delete = async (req, res) => {
    const id = req.body.id;
    try {
        await Product.findByIdAndDelete(id);
        const currentUser = await User.findById(currentUserId(req));
        currentProducts = currentUser.products;
        const newProducts = currentProducts.filter(product => {
            return product !== id;
        });
        await User.findByIdAndUpdate(currentUserId(req),{products: newProducts});
        res.redirect(201, 'products');
    } catch {
        res.status(400);
    }
}

module.exports.products_edit_get = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(201).render('editProduct', { title: 'Edit Product', name: product.productName, description: product.productDescription });
    } catch {
        res.status(400);
    }
}

module.exports.products_edit_post = async (req, res) => {
    const id = req.params.id;
    const { productName, productDescription } = req.body;
    try {
        await Product.findByIdAndUpdate(id,{productName : productName, productDescription : productDescription});
        res.status(201).json({message:'success'});
    } catch {
        res.status(400);
    }
}

module.exports.products_qrcode_get = (req, res) => {
    const id = req.params.id;
    res.status(200).render('qr', {title: 'QRCode', id: id});
}