import { Router } from 'express';
import { createTopicHandler, deleteTopicHandler, getTopicByChapterIdHandler, getTopicByIdHandler, getTopicPagingHandler, updateTopicHandler } from '../handler/topic.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createTopicHandler)
router.get("/:_id", authAdmin, getTopicByIdHandler)
router.get("/", authAdmin, getTopicPagingHandler)
router.patch('/:_id', authAdmin, updateTopicHandler)
router.delete("/:_id", authAdmin, deleteTopicHandler)
router.get("/chapterId/:_id", authAdmin, getTopicByChapterIdHandler)

export default router