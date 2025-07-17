import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Author:{
        type: String,
        required: true,
    },
    ISBN:{
        type: String,
        required: true,
        unique: true
    },
    Quantity:{
        type: Number,
        required: true,
    },
    Available:{
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
}
);
export const Book = mongoose.model('Book', BookSchema);