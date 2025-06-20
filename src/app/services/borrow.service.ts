import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const createBorrow = async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;
  const book = await Book.findById(bookId);

  // Business Logic:
  // Verify the book has enough available copies.

  if (!book) {
    res.send({});
  }

  if (!(book!.copies >= quantity)) {
    res.send({});
  }

  // Deduct the requested quantity from the book’s copies.
  // If copies become 0, update available to false (implement this using a static method or instance method).
  // Save the borrow record with all relevant details.

  // Request:
  // {
  //   "book": "64ab3f9e2a4b5c6d7e8f9012",
  //   "quantity": 2,
  //   "dueDate": "2025-07-18T00:00:00.000Z"
  // }

  // Response:
  // {
  //   "success": true,
  //   "message": "Book borrowed successfully",
  //   "data": {
  //     "_id": "64bc4a0f9e1c2d3f4b5a6789",
  //     "book": "64ab3f9e2a4b5c6d7e8f9012",
  //     "quantity": 2,
  //     "dueDate": "2025-07-18T00:00:00.000Z",
  //     "createdAt": "2025-06-18T07:12:15.123Z",
  //     "updatedAt": "2025-06-18T07:12:15.123Z"
  //   }
  // }
  const createdBorrow = await Borrow.create({
    book: bookId,
    quantity,
    dueDate,
  });

  res.send({
    success: true,
    message: "Book borrowed successfully",
    data: createdBorrow,
  });
};

export const getAllBorrow = (req: Request, res: Response) => {
  // Purpose:

  // Return a summary of borrowed books, including:

  // Total borrowed quantity per book (totalQuantity)
  // Book details: title and isbn
  // Details:

  // Use MongoDB aggregation pipeline to:

  // Group borrow records by book
  // Sum total quantity borrowed per book
  // Return book info and total borrowed quantity

  // Response:
  // {
  //   "success": true,
  //   "message": "Borrowed books summary retrieved successfully",
  //   "data": [
  //     {
  //       "book": {
  //         "title": "The Theory of Everything",
  //         "isbn": "9780553380163"
  //       },
  //       "totalQuantity": 5
  //     },
  //     {
  //       "book": {
  //         "title": "1984",
  //         "isbn": "9780451524935"
  //       },
  //       "totalQuantity": 3
  //     }
  //   ]
  // }
  res.send("List of borrowed books");
};
