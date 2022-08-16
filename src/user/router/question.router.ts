import { Router } from 'express';
import { getQuestionByIdHandler, getQuestionPagingHandler} from '../handler/question.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getQuestionByIdHandler)
router.get("/", authUser, getQuestionPagingHandler)

export default router