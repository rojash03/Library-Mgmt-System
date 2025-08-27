import experss from "express";
import { Book } from "../models/Book.js";

export const addBooks = async (req, res) => {
  try {
    const { title, author, isbn, quantity, available } = req.body;
    if (!title || !author || !isbn || !quantity || !available) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const newBook = new Book({ title, author, isbn, quantity, available });
    await newBook.save();
    res
      .status(200)
      .json({ message: "Book has been added successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Books retrieved successfully", books });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, quantity, available } = req.body;

    if (!title || !author || !isbn || !quantity || !available) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, isbn, quantity, available },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};
