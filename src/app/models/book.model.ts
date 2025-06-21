import { Document, Model, Schema, model } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): Promise<IBook>;
}

interface IBookModel extends Model<IBook> {
  updateAvailabilityStatus(bookId: string): Promise<IBook | null>;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies count is required"],
      min: [0, "Copies must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// Instance method to update availability based on copies
BookSchema.methods.updateAvailability = function (this: IBook) {
  this.available = this.copies > 0;
  return this.save();
};

// Static method to update availability status
BookSchema.statics.updateAvailabilityStatus = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    return await book.save();
  }
  return null;
};

// Pre-save middleware to automatically update availability
BookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

// Post-save middleware for logging
BookSchema.post("save", function (doc) {
  console.log(`Book saved: ${doc.title} by ${doc.author}`);
});

export const Book = model<IBook, IBookModel>("Book", BookSchema);
