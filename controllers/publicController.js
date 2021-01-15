const { Product, Comment, Feedback } = require('../models/Product');
const { findByIdAndUpdate } = require('../models/User');

module.exports.menu_get = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).render('publicMenu', {title: 'Menu', productName: product.productName, id: id});
}

module.exports.reviews_get = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('comments');
    res.status(200).render('listReviews', {title:'Reviews', id: id, reviews: product.comments});
}

module.exports.new_review_get = async (req, res) => {
    const id = req.params.id;
    res.status(200).render('addReview', {title:'Add Review', id:id});
}

module.exports.new_review_post = async (req, res) => {
    const id = req.params.id;
    const review = req.body;
    const newComment = await Comment.create(review);
    const product = await Product.findById(id);
    product.comments.push(newComment.id);
    await product.save();
    res.status(201).json({message:'success'});
}

module.exports.feedback_get = async (req, res) => {
    const id = req.params.id;
    res.status(200).render('addFeedback', {title:'Add Review', id:id});
}

module.exports.feedback_post = async (req, res) => {
    const id = req.params.id;
    const feedback = req.body;
    const newFeedback = await Feedback.create(feedback);
    const product = await Product.findById(id);
    product.feedbacks.push(newFeedback.id);
    await product.save();
    res.status(201).json({message:'success'});
    
}