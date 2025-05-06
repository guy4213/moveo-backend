import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { userName, instrument, password } = req.body;

    // Determine the role based on userName
    const role = userName === "guy4213" ? "admin" : "user";

    // Create a new user
    const newUser = await User.create({ userName, instrument, password, role });

    // Remove sensitive data before sending the response
    const userResponse = newUser.toJSON();

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by userName
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};

// Get user details
export const getUserDetails = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find the user by ID
    const user = await User.findByPk(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user details', details: error.message });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const { userName, instrument, password } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    if (userName) user.userName = userName;
    if (instrument) user.instrument = instrument;
    if (password) user.password = password;

    await user.save();

    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find the user by ID
    const user = await User.findByPk(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.findAll();

    res.status(200).json(users.map(user => user.toJSON()));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};