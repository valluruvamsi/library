import React, { useState, useEffect } from 'react';
import { fetchBooks, addBook, updateBook, deleteBook } from './api'; // Adjust path as needed

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  // Fetch books on component mount
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAllBooks();
  }, []);

  // Function to handle adding a new book
  const handleAddBook = async () => {
    try {
      const addedBook = await addBook(newBookTitle, newBookAuthor);
      setBooks([...books, addedBook]);
      setNewBookTitle('');
      setNewBookAuthor('');
      console.log('Book added successfully:', addedBook);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Function to handle updating a book
  const handleUpdateBook = async (id, title, author) => {
    try {
      const updatedBook = await updateBook(id, title, author);
      const updatedBooks = books.map(book => (book._id === id ? updatedBook : book));
      setBooks(updatedBooks);
      console.log('Book updated successfully:', updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Function to handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      const filteredBooks = books.filter(book => book._id !== id);
      setBooks(filteredBooks);
      console.log('Book deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => handleUpdateBook(book._id, `${book.title} Updated`, book.author)}>Update</button>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={newBookTitle}
        onChange={e => setNewBookTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBookAuthor}
        onChange={e => setNewBookAuthor(e.target.value)}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default Books;
