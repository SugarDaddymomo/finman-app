// lib/apiService.ts

import axios from 'axios';

const BASE_API_URL = 'http://localhost:8081/api/v1'; // Base URL for your API
const USER_API_URL = `${BASE_API_URL}/users`; // URL for the users endpoint
const ADMIN_API_URL = `${BASE_API_URL}/admin`; // URL for the admins endpoint

// Function to get the JWT token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem('authToken'); // Assuming you store the tokens with specific keys
    return token ? `Bearer ${token}` : ''; // Return token in Bearer format if present
};

const apiInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here (like Authorization)
    },
});

const userApiInstance = axios.create({
    baseURL: USER_API_URL,
    headers: {
      'Content-Type': 'application/json',
      // Add any other default headers here (like Authorization)
    },
});

const adminApiInstance = axios.create({
    baseURL: ADMIN_API_URL,
    headers: {
      'Content-Type': 'application/json',
      // Add any other default headers here (like Authorization)
    },
});

// Fetch paginated users
export const getPaginatedUsers = async (page: number = 0, size: number = 10) => {
  try {
    const token = getAuthToken();
    console.log(`TOKEN: ${token}`);
    const response = await adminApiInstance.get(`/users?page=${page}&size=${size}`, {
        headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

// Create a user
export const createUser = async (userData: any) => {
  try {
    const response = await apiInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Other API functions can be added here in a similar way
export const signup = async (userData: any) => {
  try {
    const response = await apiInstance.post('/auth/signup', userData);
    return response.data;
  } catch (error: any) {
      if (error.response) {
        // Return error message if available
        throw new Error(error.response.data?.message || 'Signup failed');
      } else {
        throw new Error('Technical error');
      }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const googleLogin = () => {
  window.location.href = 'http://localhost:8081/oauth2/authorization/google';
};

export const facebookLogin = () => {
  window.location.href = 'http://localhost:8081/oauth2/authorization/facebook';
};
