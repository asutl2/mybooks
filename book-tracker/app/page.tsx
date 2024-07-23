"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiTrash, FiBook } from 'react-icons/fi';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  const handleAddBook = async () => {
    if (!title || !author) {
      setError('Title and author are required.');
      return;
    }
    setError('');
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    });
    const newBook = await res.json();
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    setTitle('');
    setAuthor('');
  };

  const handleDeleteBook = async (id: number) => {
    const res = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = books;
    if (query) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredBooks(filtered);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col text-text">
      <header className="bg-primary-dark w-full p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <FiBook className="text-2xl text-white" />
          <h1 className="text-2xl font-bold text-white">My Book Tracker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 rounded"
          />
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline text-white">Home</a></li>
              <li><a href="#" className="hover:underline text-white">Log out</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={`bg-secondary text-white shadow-md p-4 ${isSidebarOpen ? 'w-1/4' : 'w-0'} transition-width duration-300 overflow-hidden relative`}>
          <button
            className={`text-white absolute top-4 right-4 ${isSidebarOpen ? '' : 'transform translate-x-full'}`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '<' : '>'}
          </button>
          {isSidebarOpen && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-accent-dark">Add a New Book</h2>
              {error && <div className="mb-4 text-danger">{error}</div>}
              <input
                className="mb-4 px-4 py-2 border rounded w-full bg-input-bg text-input-text border-input-border"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="mb-4 px-4 py-2 border rounded w-full bg-input-bg text-input-text border-input-border"
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <button
                className="bg-accent text-white font-bold py-2 px-4 rounded w-full hover:bg-accent-dark"
                onClick={handleAddBook}
              >
                Add Book
              </button>
            </>
          )}
        </aside>
        <main className="flex-1 p-4">
          <h2 className="text-4xl font-bold mb-8 text-secondary">Book Tracker</h2>
          <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
            {filteredBooks.map((book) => (
              <div key={book.id} className="relative bg-block-bg shadow-md rounded-4xl p-4 flex justify-between items-center border-2 border-block-border cursor-pointer">
                <Link href={`/book/${book.id}`} passHref>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-black">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                </Link>
                <button
                  className="bg-danger text-white font-bold py-2 px-4 rounded hover:bg-danger-dark flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBook(book.id);
                  }}
                >
                  <FiTrash className="w-5 h-5 text-black" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
