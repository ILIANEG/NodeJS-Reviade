const { Router } = require('express');
const publicController = require('../controllers/publicController');
const { route } = require('./ownerRoutes');
const router = require('./ownerRoutes');


//Public menu route
router.get('/public/:id', publicController.menu_get);

//Public comments acccess route
router.get('/public/:id/reviews', publicController.reviews_get);

//Public write comment form
router.get('/public/:id/reviews/add', publicController.new_review_get);

//Public add coment (submit form)
router.post('/public/:id/reviews/add', publicController.new_review_post);

//Public feedback form access route
router.get('/public/:id/feedback', publicController.feedback_get);

//Public send feedback route (submit form)
router.post('/public/:id/feedback', publicController.feedback_post);

module.exports = router;