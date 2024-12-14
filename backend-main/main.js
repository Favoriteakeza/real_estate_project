const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');

const app = express();

// Use CORS
app.use(cors({ origin: 'http://localhost:3000' })); // Allow only your frontend

// Parse JSON body
app.use(express.json());

// Log incoming request body

// Use the userRouter for /api/users routes
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
