const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const middlewares = require('../utils/middlewares');
const mongoose = require('mongoose').Types;
/**
 * Get All products
 * Pagination depends on the page & limit URL queries
 */
router.get('/all', middlewares.pagination(Product), (req, res) => {
   res.end(JSON.stringify(res.data), null, 3);
});

/**
 * Edit Product
 */
router.post('/editProduct', async (req, res) => {
   let id = req.body.id;
   let response = {};
   let data = {};
   if (id) {
      await Product.findOne({"_id": id}).then(async (obj) => {
         data.name = req.body.name ? req.body.name : obj.name;
         data.price = req.body.price ? req.body.price : obj.price;
         data.image = req.body.image ? req.body.image : obj.image;

         await Product.updateOne({"_id": mongoose.ObjectId(id)}, {$set: data}, (err) => {
            if (err) {
               res.status(500).end(
                   JSON.stringify(
                       { message: err.message }, null, 3)
               );
            }
               response.message = "Product Updated Successfully!";
               response.status = 200;
         })
      }).catch((err) => {
         response.message = err.message;
         response.status = 500;
      });
   } else {
      response.message = "Could not find product id";
      response.status = 500;
   }
   res.end(JSON.stringify(
       response,
       null,
       3
   ));
});

/**
 * Delete Product
 */
router.post('/delete', async (req, res) => {
   let response = {};
   let id = req.body.id;

   if (!id) {
      response.message = "Could not find product id";
      response.status = 500;
   } else {
      await Product.findOneAndRemove({"_id" : mongoose.ObjectId(id)}).then(() => {
         response.message = "Product has been successfully deleted!";
         response.status = 200;
      }).catch((err) => {
         response.message = err.message;
         response.status = 500;
      });
   }
   res.end(JSON.stringify(
       response,
       null,
       3
   ));
});

/**
 * Add Product
 */
router.post('/add', async (req, res) => {
   let response = {};
   let product = new Product();
   product.name = req.body.name;
   product.price = req.body.price;
   product.image = req.body.image ? req.body.image : 'https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png';
   await product.save().then((obj) => {
         response.message = "Product has been successfully created!";
         response.status = 200;
   }).catch((err) => {
      response.message = err.message;
      response.status = 500;
   });
   res.end(JSON.stringify(
       response,
       null,
       3
   ));
});

/**
 * Sort By Name and Price
 */
router.get('/getSorted', middlewares.pagination(Product, true),
    (req, res) => {
       res.end(JSON.stringify(res.data), null, 3);
});

module.exports = router;
