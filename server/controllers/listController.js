const db = require('../models/shopsterModels.js');

// define function generating an error obj for global error handling here:


const listController = {};

// getAll products to populate shopping list options
// res.locals.products = [prod_name, prod_name, prod_name]
listController.getAll = (req, res, next) => {
  db.query('SELECT * FROM products')
    .then(data => {



      //now sorts alphabetically
      res.locals.products = data.rows.sort((a, b) => {
        console.log('a, b', a, b)
        if (a.prod_name.toLowerCase() > b.prod_name.toLowerCase()) return 1
        if (a.prod_name.toLowerCase() < b.prod_name.toLowerCase()) return -1
        return 0
      });
      next();
    })
    .catch(err => {
      console.log('line 16 listController.js', err);
      next();
    })
};

//submit list button on shoppingList.jsx
// req.body object- currUserId, [prod_id, prod_id]
// 2nd login- user gets previous shopping, makes changes, hit submit --> conditional DELETE FROM shoppingList WHERE user_id === currUserId, INSERT all new values
listController.submitList = (req, res, next) => {

  console.log('submitList req.body: ,', req.body)
  const { user_id, productsArr } = req.body;

  let queryStr = `DELETE FROM shopping_list WHERE sl_user_id = ${user_id};`
  // loop to call query and insert into for each product in array
  productsArr.forEach(prodObj => {


    //query string for Insert query
    queryStr += `
      INSERT INTO shopping_list (
        sl_quantity,
        sl_in_cart,
        sl_user_id,
        sl_prod_id
      ) VALUES (
        1,
        false,
        ${req.body.user_id},
        ${prodObj.prod_id}
      );
    `
  });
  // Insert query to add record to shopping_list table


  console.log('submitList controller queryStr after loop: ', queryStr);
  db.query(queryStr)
    .then(data => {
      res.locals.shoppingList = productsArr;
      next()
    })
    .catch(err => {
      return console.log('Error found in Insert query, productsArr.forEach, listController.submitList: ', err)
    })

};

//delete all from list option
listController.clearList = (req, res, next) => {
  next();
};

module.exports = listController;