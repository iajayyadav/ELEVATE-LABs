// 1. Import Express
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies 
// This is needed to read the body of POST and PUT requests
app.use(express.json());

// 2. In-memory data store (as per instructions, no database needed) [cite: 6]
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];
let nextId = 4;

// 3. Define API Endpoints (Routes)

// GET /books: Get all books [cite: 14]
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id: Get a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// POST /books: Add a new book [cite: 15]
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    // Basic validation
    if (!title || !author) {
        return res.status(400).send('Title and author are required.');
    }

    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };

    books.push(newBook);
    res.status(201).json(newBook); // 201 Created is the standard status for a successful POST
});

// PUT /books/:id: Update an existing book [cite: 17]
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        const { title, author } = req.body;

        // Update only the fields that are provided
        if (title) {
            books[bookIndex].title = title;
        }
        if (author) {
            books[bookIndex].author = author;
        }

        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).send('Book not found');
    }
});

// DELETE /books/:id: Delete a book [cite: 18]
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send(); // 204 No Content is standard for successful deletion
    } else {
        res.status(404).send('Book not found');
    }
});


// 4. Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});