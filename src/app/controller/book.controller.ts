import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

interface QueryParams {
  filter?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
  limit?: number;
}

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryParams: QueryParams = {
      filter: req.query.filter as string,
      sort: req.query.sort as "asc" | "desc",
      sortBy: req.query.sortBy as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    };

    const {
      filter,
      sort = "asc",
      sortBy = "createdAt",
      limit = 10,
    } = queryParams;

    // Query object
    let query: any = {};
    if (filter) {
      query.genre = filter;
    }

    // Sort object
    const sortOrder = sort === "desc" ? -1 : 1;
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder;

    const books = await Book.find(query).sort(sortObj).limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to check book availability (used by borrow controller)
export const checkBookAvailability = async (
  bookId: string,
  requestedQuantity: number
) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error("Book not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (book.copies < requestedQuantity) {
    const error = new Error("Insufficient copies available");
    (error as any).statusCode = 400;
    throw error;
  }

  return book;
};

// Helper function to update book copies (used by borrow controller)
export const updateBookCopies = async (
  bookId: string,
  newCopiesCount: number
) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error("Book not found");
    (error as any).statusCode = 404;
    throw error;
  }

  book.copies = newCopiesCount;
  await book.updateAvailability();
  return book;
};
