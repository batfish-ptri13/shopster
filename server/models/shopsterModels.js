const { Pool } = require('pg');

// if we end up using SQL db, update the link to db below
const PG_URI = '';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};