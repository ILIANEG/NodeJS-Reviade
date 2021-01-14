const { Product, Comment, Feedback } = require('../models/Product');

module.exports.menu_get = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(201).render('publicMenu', {title: 'Menu', productName: product.productName, id: id});
}

module.exports.reviews_get = async (req, res) => {
    const id = req.params.id;
    res.send('get comments');
}

module.exports.new_review_get = async (req, res) => {
    const id = req.params.id;
    res.send('comment get form');
}

module.exports.new_review_post = async (req, res) => {
    const id = req.params.id;
    res.send('comment post form');
}

module.exports.feedback_get = async (req, res) => {
    const id = req.params.id;
    res.send('feedback add form');
}

module.exports.feedback_post = async (req, res) => {
    const id = req.params.id;
    res.send('feedback post form')
}