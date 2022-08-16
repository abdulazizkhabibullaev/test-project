import { Router } from 'express';
import { createClassHandler, deleteClassHandler, getClassByIdHandler, getClassPagingHandler, updateClassHandler } from '../handler/class.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createClassHandler)
router.get("/:_id", authAdmin, getClassByIdHandler)
router.get("/", authAdmin, getClassPagingHandler)
router.patch('/:_id', authAdmin, updateClassHandler)
router.delete("/:_id", authAdmin, deleteClassHandler)

export default router