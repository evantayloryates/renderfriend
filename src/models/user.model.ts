// @ts-nocheck
import prisma from '../utils/db'

class User {
  static async findAll() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.user.create({
        data: data,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email: email },
      });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      return await prisma.user.update({
        where: { id: id },
        data: data,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default User;
