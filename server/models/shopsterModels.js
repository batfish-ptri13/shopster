const { Pool } = require('pg');

// link to elephantSQL database, Emi's account
const PG_URI = 'postgres://fychxiou:w1rGx_R4WejLqHJVwVM1bZHTT2a-4Woq@batyr.db.elephantsql.com/fychxiou';

const pool = new Pool({
  connectionString: PG_URI
});

// Database is comprised of 3 tables- products, users, shopping list
  // You can find a copy of our schema model here:

//Test database connection
// pool.connect();

// pool.query('SELECT * FROM products', (err, res) => {
//   if (!err) {
//     console.log(res.rows)
//   } else {
//     console.log(err.message);
//   }
//   pool.end;
// })

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};