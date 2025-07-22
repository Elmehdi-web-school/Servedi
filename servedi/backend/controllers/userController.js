const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;
    
    const query = {};
    
    // Filter by role if specified
    if (role && ['client', 'provider'].includes(role)) {
      query.role = role;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only return active users
    query.isActive = true;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(query)
      .select('-password -refreshTokens')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      message: 'Users retrieved successfully',
      users,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: users.length,
        totalUsers: total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password -refreshTokens');
    
    if (!user || !user.isActive) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    res.json({
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid user ID' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to retrieve user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user._id;
    
    // Remove fields that shouldn't be updated via this endpoint
    delete updates.email;
    delete updates.password;
    delete updates.role;
    delete updates.isActive;
    delete updates.isEmailVerified;
    delete updates.refreshTokens;
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;
    
    const user = await User.findByIdAndUpdate(
      userId, 
      updates, 
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Soft delete - set isActive to false instead of actually deleting
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    res.json({
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ 
      message: 'Failed to deactivate account',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getProviders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, services, city, state } = req.query;
    
    const query = { 
      role: 'provider', 
      isActive: true 
    };
    
    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { businessDescription: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by services
    if (services) {
      const serviceArray = services.split(',').map(s => s.trim());
      query.services = { $in: serviceArray };
    }
    
    // Filter by location
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }
    
    if (state) {
      query['location.state'] = { $regex: state, $options: 'i' };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const providers = await User.find(query)
      .select('-password -refreshTokens')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'rating.average': -1, createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.json({
      message: 'Providers retrieved successfully',
      providers,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: providers.length,
        totalProviders: total
      }
    });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve providers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteAccount,
  getProviders
};