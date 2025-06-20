import express from "express";
import { createBorrow, getAllBorrow } from "../services/borrow.service";

const BorrowRoutes = express.Router();

BorrowRoutes.get("/", getAllBorrow);
BorrowRoutes.post("/", createBorrow);

export default BorrowRoutes;
