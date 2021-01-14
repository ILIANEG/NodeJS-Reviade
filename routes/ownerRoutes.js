/* This document takes care of product owner routs */

const { requireAuth } = require('../middleware/authentificator');
const { Router } = require('express');
const ownerController = require('../controllers/ownerController.js')

//Create router instance
const router = Router();

/* ROUTES */

//Home route
router.get('/', requireAuth, ownerController.home_get);

//List products route
router.get('/products', requireAuth, ownerController.products_get);

//Add product form route
router.get('/products/add', requireAuth, ownerController.products_add_get);

//Add product post route
router.post('/products/add', requireAuth, ownerController.products_add_post);

//Delete product route
router.delete('/products/delete', requireAuth, ownerController.products_delete);

//Product edit page route
router.get('/products/edit/:id', requireAuth, ownerController.products_edit_get);

//Edit product form submit route
router.post('/products/edit/:id', requireAuth, ownerController.products_edit_post);

router.get('/products/displayqr/:id', requireAuth, ownerController.products_qrcode_get);

//Export router
module.exports = router;