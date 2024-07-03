import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateBook({ bookId, onUpdate }) {
  const [book, setBook] = useState({ title: "", author: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${bookId}`)
      .then(response => setBook(response.data))
      .catch(error => console.error("There was an error fetching the book!", error));
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/books/${bookId}`, book)
      .then(response => {
        console.log("Book updated successfully");
        onUpdate();
      })
      .catch(error => console.error("There was an error updating the book!", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={book.title} onChange={handleChange} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} />
      </div>
      <button type="submit">Update Book</button>
    </form>
  );
}

export default UpdateBook;
