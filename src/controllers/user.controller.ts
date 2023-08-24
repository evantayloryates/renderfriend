import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'; // Updated import statement

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all users from the database
    // Note: You might need to add a method in the User model to fetch all users.
    const users = await User.findAll(); 
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    // Fetch the user from the database by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    // Create a new user in the database
    const newUser = await User.create(userData);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

//... [other imports and methods]

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    
    // Update the user in the database using the provided User model method
    const updatedUser = await User.update(userId, updatedData);

    // Optionally: Check if user was actually updated, otherwise return a 404
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    // Delete the user from the database using the provided User model method
    await User.delete(userId);

    // Respond with a 204 No Content status after successful deletion
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
