import { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { checkBookAvailability, updateBookCopies } from './book.controller';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowData = {
      book: req.body.book,
      quantity: req.body.quantity,
      dueDate: req.body.dueDate
    };
    
    // Check if book exists and has enough copies
    const book = await checkBookAvailability(borrowData.book, borrowData.quantity);
    
    // Create borrow record first (this will validate due date)
    const borrow = await Borrow.create({
      book: borrowData.book,
      quantity: borrowData.quantity,
      dueDate: new Date(borrowData.dueDate)
    });

    // Only update book copies if borrow record creation was successful
    const newCopiesCount = book.copies - borrowData.quantity;
    await updateBookCopies(borrowData.book, newCopiesCount);
    
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Use aggregation pipeline to get borrowed books summary
    const summary = await Borrow.aggregate([
      {
        // Group by book and sum quantities
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        // Lookup book details
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        // Unwind the book details array
        $unwind: '$bookDetails'
      },
      {
        // Project the required fields
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      },
      {
        // Sort by title for consistent ordering
        $sort: { 'book.title': 1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBorrowRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrows = await Borrow.find().populate('book', 'title author isbn');
    
    res.status(200).json({
      success: true,
      message: 'Borrow records retrieved successfully',
      data: borrows
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId).populate('book', 'title author isbn');
    
    if (!borrow) {
      res.status(404).json({
        success: false,
        message: 'Borrow record not found',
        error: 'Borrow record not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Borrow record retrieved successfully',
      data: borrow
    });
  } catch (error) {
    next(error);
  }
};
