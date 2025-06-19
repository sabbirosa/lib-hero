import { Schema, model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
    required: true,
  },
  isbn: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  copies: {
    type: Number,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export const Book = model("Book", BookSchema);
