/* All product and product related Schemas are defined in this document */

//require Mongoose middleware
const mongoose = require('mongoose');
const User = require('./User');

/* Create new product schema, one to many relation with comment 
    and feedback */
const productSchema = new mongoose.Schema({
    productName: {type:String, required:[true, 'product name is not provided']},
    productDescription: {type:String, required:false},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }],
    feedbacks:[{ type: mongoose.Schema.Types.ObjectId, ref:'Feedback' }],
});

/* Comment are publicly avaliable */
const commentSchema = new mongoose.Schema({
    author: {type:String, required:[true, 'author name is not provided']},
    comment: {type: String, required:false},
    rating: {type: Number, required:[true, 'rating is not provided'], min:1, max:5}
});

/* Feedbacks are not publickly avaliable */
const feedbackSchema = new mongoose.Schema({
    //author can be anonymous
    author: {type:String, required:false},
    comment: {type: String, required:false}
});

//Product post delete hook hooks
productSchema.post('findByIdAndDelete', () => {
    this.comment.forEach(async (comment) => {
        await Comment.findByIdAndDelete(comment);
    });
    this.fedback.forEach(async (feedback) => {
        await Feedback.findByIdAndDelete(feedback);
    });
});

//Create models
const Product = mongoose.model('Product', productSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

//Export models
module.exports.Product = Product;
module.exports.Comment = Comment;
module.exports.Feedback = Feedback;
