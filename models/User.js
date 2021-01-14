// Require mongoose middleware
const mongoose = require('mongoose');
const Product = require('./Product');
const bcrypt = require('bcrypt');

/* User schema */
const userSchema = new mongoose.Schema({ 
    login: {type: String, required:[true, 'username is not provided'], unique:[true, 'username is not avaliable']},
    password: {type: String, required:[true, 'password is not provided'], minLength:[8, 'password is too short, minimum 8 characters']},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref:'Product' }]
});

//Password hashing hook
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Check for user with credentials
userSchema.statics.login = async function(login, password) {
    const user = await this.findOne({login});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect login');
}

//Create models
const User = mongoose.model('User', userSchema);

//export module
module.exports = User;