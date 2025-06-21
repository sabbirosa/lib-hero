import { Document, ObjectId, Schema, model } from "mongoose";

interface IBorrow extends Document {
  book: ObjectId;
  quantity: number;
  dueDate: Date;
}

const BorrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, 'Book reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer'
      }
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
      validate: {
        validator: function(date: Date) {
          return date > new Date();
        },
        message: 'Due date must be in the future'
      }
    },
  },
  { versionKey: false, timestamps: true }
);

// Pre-save middleware to validate due date
BorrowSchema.pre('save', function(next) {
  if (this.dueDate <= new Date()) {
    const error = new Error('Due date must be in the future');
    return next(error);
  }
  next();
});

// Post-save middleware for logging
BorrowSchema.post('save', function(doc) {
  console.log(`Book borrowed: ${doc.book} - Quantity: ${doc.quantity}`);
});

export const Borrow = model<IBorrow>("Borrow", BorrowSchema);
