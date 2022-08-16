import { Router } from 'express';
import { getTestByIdHandler, getTestPagingHandler} from '../handler/test.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getTestByIdHandler)
router.get("/", authUser, getTestPagingHandler)

export default router