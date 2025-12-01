import type { User } from '../types/auth';

const USERS_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

export const localStorageService = {
  saveUser: (userData: User): void => {
    try {
      const existingUsers = localStorageService.getUsers();
      const userExists = existingUsers.some(user => user.email === userData.email);
      
      if (userExists) {
        throw new Error('User already exists with this email');
      }
      
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  getUsers: (): User[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  validateLogin: (email: string, password: string): User | null => {
    try {
      const users = localStorageService.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      return user || null;
    } catch (error) {
      console.error('Error validating login:', error);
      return null;
    }
  },

  setCurrentUser: (user: User): void => {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  },

  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  logout: (): void => {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  checkEmailExists: (email: string): boolean => {
    try {
      const users = localStorageService.getUsers();
      return users.some(user => user.email === email);
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
};