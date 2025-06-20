import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const createdBook = await Book.create(bookData);

  res.send({
    success: true,
    message: "Book created successfully",
    data: {
      createdBook,
    },
  });
};

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();

  res.send({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};

export const getBookByID = async (req: Request, res: Response) => {
  const { bookID } = req.params;
  const book = await Book.findById(bookID);
  res.send({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};

export const updateBookByID = async (req: Request, res: Response) => {
  const { bookID } = req.params;
  const updatedData = req.body;

  const updatedBook = await Book.findByIdAndUpdate(bookID, updatedData, {
    new: true,
  });
  res.send({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
};

export const deleteBookByID = async (req: Request, res: Response) => {
  const { bookID } = req.params;
  await Book.findByIdAndDelete(bookID);

  res.send({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
};
