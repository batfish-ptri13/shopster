const { Pool } = require('pg');

const PG_URI = 'postgres://rnksakhp:RiTpcMc-3W5iYnJafn4MtxO0RjXMHtjG@mahmud.db.elephantsql.com/rnksakhp';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};