import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password });
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;  
      }
    } catch (err) {
      return rejectWithValue(err.response?.data.message || 'Login Failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', { name, email, password });
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data.message || 'Registration Failed');
    }
  }
);
