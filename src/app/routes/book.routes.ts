import express from "express";
import {
  createBook,
  deleteBookByID,
  getBookByID,
  getBooks,
  updateBookByID,
} from "../services/book.service";

const BookRoutes = express.Router();

BookRoutes.get("/", getBooks);
BookRoutes.post("/", createBook);
BookRoutes.get("/:bookID", getBookByID);
BookRoutes.put("/:bookID", updateBookByID);
BookRoutes.delete("/:bookID", deleteBookByID);

export default BookRoutes;
