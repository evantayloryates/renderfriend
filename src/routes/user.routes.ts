import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

// Middleware to handle potential authentication or authorization could also be included here.

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

export default router;
