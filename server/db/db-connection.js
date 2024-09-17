const { Pool } = require('pg');
const db = new Pool({
    connectionString: process.env.DATABASE_URI
  });

  module.exports = db;
  //this was the default setting for connecting to the database