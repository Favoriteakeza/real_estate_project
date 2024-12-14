const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'real_estate',
  password: 'Kigali@2024',
  port: 5435,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Error testing the database connection:', err));

module.exports = pool;
