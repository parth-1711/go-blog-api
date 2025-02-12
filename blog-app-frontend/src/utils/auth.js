// src/utils/auth.js
import {jwtDecode} from 'jwt-decode';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

};

export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  }
  return false;
};
