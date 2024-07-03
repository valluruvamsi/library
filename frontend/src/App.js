import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  };

  const addBook = () => {
    console.log("Adding book with title:", title, "and author:", author);
    axios.post('http://localhost:5000/books', { title, author })
      .then(response => {
        console.log("Response from server:", response);
        fetchBooks();
        setTitle('');
        setAuthor('');
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
      });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(response => {
        fetchBooks();
      })
      .catch(error => {
        console.error('There was an error deleting the book!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Library </h1>
        <p>Manage your library efficiently and effectively.</p>
        <div>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="cta-button" onClick={addBook}>Add Book</button>
        </div>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              {book.title} by {book.author}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
