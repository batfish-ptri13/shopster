const express = require('express');

const listController = require('../controllers/listController.js');

const router = express.Router();

// add maze router handlers here:

// getAll products to populate shopping list options
router.get('/getAllProd', listController.getAll, (req, res) => {
  return res.status(200).json(res.locals.products);
});

// post shopping list- click submit (update or post)
router.post('/submitList', listController.submitList, (req, res) => {
  if(res.locals.shoppingList === 'success') {
    return res.status(200).json(res.locals.shoppingList);
  } else {
    return res.status(500);
  }
});

// deleteAll- clear all items from list
  // submit list button on shoppingList.jsx
router.delete('/clearList', listController.clearList, (req, res) => {
  return res.status(200);
})


module.exports = router;