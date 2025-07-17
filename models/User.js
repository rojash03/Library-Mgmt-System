import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    Role:{
        type: String,
        enum: ["borrower", "librarian"],
        default: 'borrower'
    },
},
{
    timestamps: true,
}
);
export const User = mongoose.model('User', userSchema);
