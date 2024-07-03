import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const handleAddBook = async () => {
    try {
      if (editingBook) {
        await axios.put(`${API_URL}/books/${editingBook._id}`, { title, author });
        setEditingBook(null);
      } else {
        await axios.post(`${API_URL}/books`, { title, author });
      }
      setTitle('');
      setAuthor('');
      fetchBooks();
    } catch (error) {
      console.error("There was an error adding the book!", error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <button onClick={handleAddBook}>
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
