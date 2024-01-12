const db = require('../models/shopsterModels.js');

// define function generating an error obj for global error handling here:


const listController = {};

// getAll products to populate shopping list options
    // res.locals.products = [prod_name, prod_name, prod_name]
listController.getAll = (req, res, next) => {
  db.query('SELECT * FROM products')
    .then(data => {
      res.locals.products = data.rows;
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
  const {user_id, productsArr} = req.body;

  // loop to call query and insert into for each product in array
  productsArr.forEach( prod_id => {
    // query to find corresponding location data? Unnesecary if we send prod_location_x and y back on req object from frontend, maybe in an array of objects [{prod_id: __, prod_location_x:__, prod_location_y:__}]
    db.query(`SELECT * FROM products WHERE prod_id === ${prod_id}`)
    .then(data => {
      const sl_prod_location_x = data.rows.prod_location_x;
      const sl_prod_location_y = data.rows.prod_location_y;
    })
    .catch(err => {
      return console.log('Error found in location query, productsArr.forEach, listController.submitList: ', err)
    })
    //query string for Insert query
    const query = `
      INSERT INTO shopping_list (
        sl_quantity,
        sl_in_cart,
        sl_user_id,
        sl_prod_id,
        sl_prod_location_x,
        sl_prod_location_y
      ) VALUES (
        1,
        false,
        ${user_id},
        ${prod_id},
        ${sl_prod_location_x},
        ${sl_prod_location_y}
      )
    `;
    // Insert query to add record to shopping_list table
    db.query(query)
      .catch(err => {
        return console.log('Error found in Insert query, productsArr.forEach, listController.submitList: ', err)
      })
  });
  return next();
};

//delete all from list option
listController.clearList = (req, res, next) => {
  next();
};

module.exports = listController;