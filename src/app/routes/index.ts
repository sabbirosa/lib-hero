import express from "express";
import BookRoutes from "./book.routes";
import BorrowRoutes from "./borrow.routes";

const router = express.Router();

router.use("/books", BookRoutes);
router.use("/borrow", BorrowRoutes);

export default router;
