import mongoose from "mongoose";

export const BorrowSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true,
}
);
export const Borrow = mongoose.model('Borrow', BorrowSchema);