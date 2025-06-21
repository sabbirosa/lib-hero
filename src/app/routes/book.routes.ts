import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controller/book.controller';
import { createBookValidation, updateBookValidation } from '../middlewares/validate.middleware';

const router = express.Router();

// Create a new book
router.post('/', createBookValidation, createBook);

// Get all books with filtering and sorting
router.get('/', getBooks);

// Get a book by ID
router.get('/:bookId', getBookById);

// Update a book by ID
router.put('/:bookId', updateBookValidation, updateBook);

// Delete a book by ID
router.delete('/:bookId', deleteBook);

export default router;
