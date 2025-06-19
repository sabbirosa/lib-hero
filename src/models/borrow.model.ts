import { ObjectId, Schema, model } from "mongoose";

interface IBorrow {
  book: ObjectId;
  quantity: number;
  dueDate: Date;
}

const BorrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Borrow = model("Borrow", BorrowSchema);
