import express from "express";

const BorrowRoutes = express.Router();

BorrowRoutes.get("/", (req, res) => {
  res.send("List of borrowed books");
});

export default BorrowRoutes;
