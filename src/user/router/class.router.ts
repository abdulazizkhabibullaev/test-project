import { Router } from 'express';
import { getClassByIdHandler, getClassPagingHandler} from '../handler/class.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getClassByIdHandler)
router.get("/", authUser, getClassPagingHandler)

export default router