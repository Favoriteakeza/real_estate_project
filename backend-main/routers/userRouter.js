const express = require('express');
const { registerUser, loginUser, resetPassword, verifyUser, sendPasswordResetRequest, verify2FACode } = require('../controllers/userControllers');
const router = new express.Router();

router.post('/register', registerUser);
router.post('/verify-email', verifyUser);
router.post('/login', loginUser);
router.post('/verify-2fa', verify2FACode);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', sendPasswordResetRequest);

module.exports = router;