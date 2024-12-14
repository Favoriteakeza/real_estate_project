const pool = require('./connection'); // Adjust the path to match your `connection.js` file

(async () => {
    try {
        const result = await pool.query('SELECT NOW()'); // A simple query to check database connectivity
        console.log('Database connected successfully. Current time:', result.rows[0].now);
    } catch (error) {
        console.error('Error testing the database connection:', error);
    } finally {
        await pool.end(); // Close the pool to prevent hanging connections
    }
})();
