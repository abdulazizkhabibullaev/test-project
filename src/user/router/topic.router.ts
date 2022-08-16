import { Router } from 'express';
import { getTopicByChapterIdHandler, getTopicByIdHandler, getTopicPagingHandler} from '../handler/topic.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getTopicByIdHandler)
router.get("/", authUser, getTopicPagingHandler)
router.get("/chapterId/:_id", authUser, getTopicByChapterIdHandler)

export default router