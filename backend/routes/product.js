const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const middlewares = require('../utils/middlewares');

/**
 * Get All products
 * Pagination depends on the page & limit URL queries
 */
router.get(
    '/all',
    middlewares.pagination(Product),
    (req, res) => {
   res.end(JSON.stringify(res.data), null, 3);
});

module.exports = router;
