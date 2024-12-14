const createUserTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'client', -- Updated field to match the roles string from frontend
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

module.exports = { createUserTable };
