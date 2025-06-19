import express from "express";

const BookRoutes = express.Router();

BookRoutes.get("/", (req, res) => {
  res.send("List of books");
});

export default BookRoutes;
