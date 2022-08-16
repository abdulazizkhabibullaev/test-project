import { Router } from 'express';
import { createQuestionHandler, deleteQuestionHandler, getQuestionByIdHandler, getQuestionPagingHandler, updateQuestionHandler, } from '../handler/question.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createQuestionHandler)
router.get("/:_id", authAdmin, getQuestionByIdHandler)
router.get("/", authAdmin, getQuestionPagingHandler)
router.patch('/:_id', authAdmin, updateQuestionHandler)
router.delete("/:_id", authAdmin, deleteQuestionHandler)

export default router