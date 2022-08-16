import { Router } from 'express';
import { getChapterByIdHandler, getChapterPagingHandler, getChapterByClassIdHandler } from '../handler/chapter.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getChapterByIdHandler)
router.get("/", authUser, getChapterPagingHandler)
router.get("/subjectId/:_id", authUser, getChapterByClassIdHandler)

export default router