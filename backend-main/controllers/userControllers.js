const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter, sendVerificationEmail } = require('../middleware/zohoEmail');
const crypto = require("crypto");
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};


const temporaryUsers = new Map(); // Use a Map for temporary storage

const registerUser = async (req, res) => {
    const { names, email, password, roles } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (existingUser.rowCount > 0) {
            console.log("Conflict: User already exists with email:", email);
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        // Generate a random OTP
        const otp = generateOTP();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store temporary user data
        temporaryUsers.set(email, {
            names,
            email,
            hashedPassword,
            roles,
            otp,
            createdAt: Date.now(),
        });
        console.log(temporaryUsers)
        console.log(email)
        // Send OTP email
        sendVerificationEmail(email, otp);

        // Respond with success
        res.status(200).json({
            message: 'OTP sent to your email. Please verify to complete registration.',
        });
    } catch (err) {
        console.error("Error during registration:", err); // Log error details
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

const verifyUser = async (req, res) => {
    const { email, otp } = req.body;
    
    
    try {
        const tempUser = temporaryUsers.get(email);
        
        if (!tempUser) {
           
            console.log('Verification failed: User not found in temporary storage.', email);
            return res.status(400).json({ error: 'OTP expired or user not found.' });
        }

        if (Date.now() - tempUser.createdAt > OTP_EXPIRY_TIME) {
            console.log('Verification failed: OTP expired.');
            temporaryUsers.delete(email);
            return res.status(400).json({ error: 'OTP expired. Please register again.' });
        }

        if (tempUser.otp !== otp) {
            console.log('Verification failed: Invalid OTP.');
            return res.status(400).json({ error: 'Invalid OTP.' });
        }

        // Save the user to the database
        const result = await pool.query(
            `INSERT INTO Users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`,
            [tempUser.names, tempUser.email, tempUser.hashedPassword, tempUser.roles]
        );

        temporaryUsers.delete(email); // Cleanup

        res.status(201).json({
            message: 'User verified and registered successfully.',
            user: {
                user_id: result.rows[0].user_id,
                username: result.rows[0].username,
                email: result.rows[0].email,
                role: result.rows[0].role,
                created_at: result.rows[0].created_at,
            },
        });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ error: 'An error occurred while verifying the user.' });
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Find the user
        const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (user.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Check if user already has a secret
        let userSecret = user.rows[0].two_fa_secret;
        if (!userSecret) {
            // Generate and store a new secret if none exists
            const secret = speakeasy.generateSecret({ length: 20 });
            userSecret = secret.base32;
            await pool.query('UPDATE Users SET two_fa_secret = $1 WHERE email = $2', [userSecret, email]);
        }

        // Generate a 2FA code using the stored secret
        const token = speakeasy.totp({ secret: userSecret, encoding: 'base32' });

        // Send the 2FA code via email
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 587,
            secure: false,
            auth: {
                user: 'hirwa_landry@zohomail.com',
                pass: 'bdx5xt3sfMA4',
            },
        });

        const mailOptions = {
            from: 'hirwa_landry@zohomail.com',
            to: email,
            subject: 'Your 2FA Code',
            text: `Your 2FA code is: ${token}`,
        };

        await transporter.sendMail(mailOptions);

        // Respond with the 2FA verification request
        res.status(200).json({ message: 'Login successful. Please enter the 2FA code sent to your email.' });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

// Verify 2FA code
const verify2FACode = async (req, res) => {
    const { email, code } = req.body;

    try {
        // Find the user by email
        const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
       
        if (user.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Get the 2FA secret stored in the database
        const userSecret = user.rows[0].two_fa_secret;
        const isValid = speakeasy.totp.verify({
            secret: userSecret,
            encoding: 'base32',
            token: code,
            window: 1, // Adjust for clock differences
        });
        console.log("Is Valid:", isValid);
        
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid 2FA code.' });
        }
        
        // If valid, generate JWT token
        const token = jwt.sign(
            { user_id: user.rows[0].user_id, role: user.rows[0].role },
            'your-secret-key', // Secret key for signing the token
            { expiresIn: '1h' } // Token expiry time (1 hour)
        );
        
        // Respond with the JWT token
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                user_id: user.rows[0].user_id,
                username: user.rows[0].username,
                email: user.rows[0].email,
                role: user.rows[0].role,
            },
        });
    } catch (err) {
        console.error("2FA verification error:", err);
        res.status(500).json({ error: 'An error occurred during 2FA verification.' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(token)
    if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required." });
    }
    console.log("Token Expiry (in seconds):", Math.floor(Date.now() / 1000));

    try {
        // Retrieve user by token and ensure the token is not expired
        const result = await pool.query(
            "SELECT * FROM Users WHERE reset_token = $1 AND token_expiry > $2",
            [token, new Date().toISOString()] // Use the Date object for TIMESTAMP
        );
        
        console.log(result)
        if (result.rowCount === 0) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password and clear the token
        await pool.query(
            "UPDATE Users SET password_hash = $1, reset_token = NULL, token_expiry = NULL WHERE reset_token = $2",
            [hashedPassword, token]
        );

        res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while resetting the password." });
    }
};

const sendPasswordResetRequest = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        // Check if the email exists in the database
        const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Email not found." });
        }

        // Generate reset token and expiry
        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date(Date.now() + 3600000).toISOString(); // Convert to ISO string

        // Update user record with reset token and expiry
        await pool.query(
            "UPDATE Users SET reset_token = $1, token_expiry = $2 WHERE email = $3",
            [resetToken, tokenExpiry, email]
        );

        // Send the reset email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: "hirwa_landry@zohomail.com",
            to: email,
            subject: "Password Reset Request",
            text: `Reset your password using the link below: ${resetUrl}`,
            html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
        });

        res.status(200).json({ message: "Password reset link sent to your email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
};

module.exports = { registerUser, loginUser, verify2FACode, resetPassword, verifyUser, sendPasswordResetRequest };
