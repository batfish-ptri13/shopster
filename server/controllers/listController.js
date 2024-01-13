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
  console.log('entered listController.submitList, req.body: ', req.body);

  // loop to call query and insert into for each product in array
  let sl_prod_location_x = 0;
  let sl_prod_location_y = 0;

  productsArr.forEach( async function (prod_id) {
    // query to find corresponding location data? Unnesecary if we send prod_location_x and y back on req object from frontend, maybe in an array of objects [{prod_id: __, prod_location_x:__, prod_location_y:__}]
    console.log('entered forEach loop listController.submitList, prod_id: ', prod_id);
    
    // await db.query(`SELECT prod_location_x, prod_location_y FROM products WHERE prod_id = ${prod_id}`)
    // .then(data => {
    //   console.log('entered location query in forEach loop listController.submitList: ', data.rows);
    //   sl_prod_location_x = data.rows[0].prod_location_x;
    //   sl_prod_location_y = data.rows[0].prod_location_y;
    //   console.log('location query assign sl_prod_location_x: ', sl_prod_location_x);
    // })
    // .catch(err => {
    //   return console.log('Error found in location query, productsArr.forEach, listController.submitList: ', err)
    // })

    const locatQuery = `SELECT prod_location_x, prod_location_y FROM products WHERE prod_id = ${prod_id}`;

    const result = await db.query(locatQuery)
    console.log('received result in forEach loop, fileController.submitList: ', result.rows);
    sl_prod_location_x = result.rows[0].prod_location_x;
    sl_prod_location_y = result.rows[0].prod_location_y;

    console.log('sl_prod_location_x: ', sl_prod_location_x);
    console.log('sl_prod_location_y: ', sl_prod_location_y);

    //query string for Insert query
    console.log('After location query, before Insert query string');
  //   const query = `
  //     INSERT INTO shopping_list (
  //       sl_quantity,
  //       sl_in_cart,
  //       sl_user_id,
  //       sl_prod_id,
  //       sl_prod_location_x,
  //       sl_prod_location_y
  //     ) VALUES (
  //       1,
  //       false,
  //       ${user_id},
  //       ${prod_id},
  //       ${sl_prod_location_x},
  //       ${sl_prod_location_y}
  //     )
  //   `;
  //   // Insert query to add record to shopping_list table
  //   db.query(query)
  //     .catch(err => {
  //       return console.log('Error found in Insert query, productsArr.forEach, listController.submitList: ', err)
  //     })
  });
  return next();
};

//delete all from list option
listController.clearList = (req, res, next) => {
  next();
};

module.exports = listController;