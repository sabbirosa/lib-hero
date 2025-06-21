import express from "express";
import { borrowBook, getAllBorrowRecords, getBorrowById, getBorrowedBooksSummary } from '../controller/borrow.controller';
import { createBorrowValidation } from '../middlewares/validate.middleware';

const router = express.Router();

// Get borrowed books summary (using aggregation)
router.get('/', getBorrowedBooksSummary);

// Borrow a book
router.post('/', createBorrowValidation, borrowBook);

// Get all borrow records
router.get('/records', getAllBorrowRecords);

// Get a borrow record by ID
router.get('/:borrowId', getBorrowById);

export default router;
