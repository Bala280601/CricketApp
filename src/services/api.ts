import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for both. For Android physical devices, run 'adb reverse tcp:5000 tcp:5000'
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
