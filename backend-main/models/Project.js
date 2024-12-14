const pool = require('../db/connection');

const createProjectTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Projects (
            project_id SERIAL PRIMARY KEY,
            project_name VARCHAR(100) NOT NULL,
            location VARCHAR(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE,
            budget NUMERIC(15, 2),
            user_id INT REFERENCES Users(user_id)
        );
    `);
};

module.exports = { createProjectTable };