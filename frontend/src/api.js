// Import statements should be at the top
import axios from 'axios';
import { API_URL } from './config';

// Other statements and code follow after imports
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;
