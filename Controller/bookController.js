import experss from "express";
import { book } from "../models/Book.js";

export const addBooks = async (req, res) => {
  try {
    const { Title, Author, ISBN, Quantity, Available } = req.body;
    if (!Title || !Author || !ISBN || !Quantity || !Available) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const newBook = new book({ Title, Author, ISBN, Quantity, Available });
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
    const books = await book.find();
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
    const { Title, Author, ISBN, Quantity, Available } = req.body;

    if (!Title || !Author || !ISBN || !Quantity || !Available) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const updatedBook = await book.findByIdAndUpdate(
      id,
      { Title, Author, ISBN, Quantity, Available },
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

    const deletedBook = await book.findByIdAndDelete(id);
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
