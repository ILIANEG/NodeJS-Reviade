/* This file puts all elements of application together */
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const publicRouter = require('./routes/publicRoutes');
const cookieParser = require('cookie-parser');


mongoose.set('useFindAndModify', false);

//initialize express app
const app = express();

//app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

//specify static content
app.use(express.static(__dirname + '/public'));

//specify view engine
app.set('view engine', 'ejs');

//Connect to the server
const dbURL = '';
mongoose.connect(dbURL).then(app.listen(3000)).catch((error) => {
    console.log(error);
});

app.use(authRoutes);
app.use(ownerRoutes);
app.use(publicRouter);
