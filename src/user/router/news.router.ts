import { Router } from 'express';
import { getNewsByIdHandler, getNewsPagingHandler } from '../handler/news.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()


router.get("/:_id", authUser, getNewsByIdHandler)
router.get("/", authUser, getNewsPagingHandler)
export default router