const express = require('express');

const listController = require('../controllers/listController.js');
const mazeController = require('../controllers/mazeController.js');

const router = express.Router();

// add maze router handlers here:

// getAll products to populate shopping list options
router.get('/getAllProd', listController.getAll, (req, res) => {
  return res.status(200).json(res.locals.products);
});

// post shopping list- click submit (update or post)
router.post('/submitList', listController.submitList, mazeController.findPathAStar, mazeController.mapLayout, (req, res) => {
  if (res.locals.shoppingList && res.locals.layoutWithProductsAndPath) {
    return res.status(200).json(res.locals.layoutWithProductsAndPath);
  } else {
    return res.status(500);
  }
});


router.post('/submitListA', mazeController.findPathAStar, (req, res, next) => { 
  if(res.locals.aStarPath) {
    return res.status(200).json(res.locals.aStarPath);
  }  else { 
    return res.status(500).json(res.locals.aStarPath);
  }

})

// deleteAll- clear all items from list
// submit list button on shoppingList.jsx
router.delete('/clearList', listController.clearList, (req, res) => {
  return res.status(200);
})


module.exports = router;