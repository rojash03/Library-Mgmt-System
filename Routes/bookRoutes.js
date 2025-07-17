import express from 'express';
import { addBooks, getAllBooks, updateBook, deleteBook } from '../Controller/bookController.js';
import { verifyLibrarian } from '../Controller/authController.js';

const router = express.Router();

router.post("/books", verifyLibrarian, addBooks);
router.get("/books",  getAllBooks);
router.put("/books/:id", verifyLibrarian, updateBook);
router.delete("/books/:id", verifyLibrarian, deleteBook);

export default router;
