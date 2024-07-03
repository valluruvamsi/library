import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your Flask backend URL

// Function to fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new book
export const addBook = async (title, author) => {
  try {
    const response = await axios.post(`${API_URL}/books`, { title, author });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update an existing book
export const updateBook = async (id, title, author) => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, { title, author });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
