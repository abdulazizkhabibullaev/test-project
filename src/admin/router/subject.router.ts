import { Router } from 'express';
import { createSubjectHandler, deleteSubjectHandler, getSubjectByClassIdHandler, getSubjectByIdHandler, getSubjectPagingHandler, updateSubjectHandler } from '../handler/subject.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createSubjectHandler)
router.get("/:_id", authAdmin, getSubjectByIdHandler)
router.get("/", authAdmin, getSubjectPagingHandler)
router.patch('/:_id', authAdmin, updateSubjectHandler)
router.delete("/:_id", authAdmin, deleteSubjectHandler)
router.get("/classId/:_id", authAdmin, getSubjectByClassIdHandler)

export default router