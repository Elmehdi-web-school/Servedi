const express = require('express');
const { getAllUsers, getUserById, updateProfile, deleteAccount, getProviders } = require('../controllers/userController');
const { authenticateToken, requireRole, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/providers', optionalAuth, getProviders);
router.get('/:id', optionalAuth, getUserById);

// Protected routes
router.get('/', authenticateToken, getAllUsers);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/account', authenticateToken, deleteAccount);

module.exports = router;