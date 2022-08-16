import { Router } from 'express';
import { createNewsHandler, deleteNewsHandler, getNewsByIdHandler, getNewsPagingHandler, updateNewsHandler } from '../handler/news.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createNewsHandler)
router.get("/:_id", authAdmin, getNewsByIdHandler)
router.get("/", authAdmin, getNewsPagingHandler)
router.patch('/:_id', authAdmin, updateNewsHandler)
router.delete("/:_id", authAdmin, deleteNewsHandler)

export default router