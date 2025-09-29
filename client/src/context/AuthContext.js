import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

// Utility to set the authorization header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user on initial mount if token exists
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []); // Run only once on mount

  const loadUser = async (token) => {
    setAuthToken(token);
    try {
      const res = await axios.get(`${API_URL}/me`);
      setUser(res.data); // The user object comes directly from the backend now
    } catch (error) {
      console.error('Failed to load user', error);
      // If token is invalid, logout
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    await loadUser(res.data.token); // Load user data after login
  };

  const register = async (username, email, phone, password) => {
    const res = await axios.post(`${API_URL}/register`, { username, email, phone, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    await loadUser(res.data.token); // Load user data after registration
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthToken(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;