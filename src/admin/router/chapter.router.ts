import { Router } from 'express';
import { createChapterHandler, deleteChapterHandler, getChapterByClassIdHandler, getChapterByIdHandler, getChapterPagingHandler, updateChapterHandler } from '../handler/chapter.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createChapterHandler)
router.get("/:_id", authAdmin, getChapterByIdHandler)
router.get("/", authAdmin, getChapterPagingHandler)
router.patch('/:_id', authAdmin, updateChapterHandler)
router.delete("/:_id", authAdmin, deleteChapterHandler)
router.get("/subjectId/:_id", authAdmin, getChapterByClassIdHandler)

export default router