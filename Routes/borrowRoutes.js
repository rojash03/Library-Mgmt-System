import express from 'express';
import { borrowBook, returnBook } from '../Controller/borrrowController.js';
import { verifyBorrower, verifyLibrarian } from '../Controller/authController.js';
import { getBorrowRecords, getBorrowRecordsById } from '../Controller/borrrowController.js';

const router = express.Router();

router.post("/borrow", verifyBorrower, borrowBook);
router.post("/return", verifyBorrower, returnBook);
router.get("/borrowRecords", verifyLibrarian, getBorrowRecords);
router.get("/borrowRecords/:userId", verifyBorrower, getBorrowRecordsById);

export default router;
