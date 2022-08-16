import { Router } from 'express';
import { getSubjectByClassIdHandler, getSubjectByIdHandler, getSubjectPagingHandler} from '../handler/subject.handler';
import { authUser } from '../middlewares/authUser';

const router = Router()

router.get("/:_id", authUser, getSubjectByIdHandler)
router.get("/", authUser, getSubjectPagingHandler)
router.get("/classId/:_id", authUser, getSubjectByClassIdHandler)

export default router