import { Router } from 'express';
import { createTestHandler, deleteTestHandler, getTestByIdHandler, getTestPagingHandler, updateTestHandler } from '../handler/test.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/", authAdmin, createTestHandler)
router.get("/:_id", authAdmin, getTestByIdHandler)
router.get("/", authAdmin, getTestPagingHandler)
router.patch('/:_id', authAdmin, updateTestHandler)
router.delete("/:_id", authAdmin, deleteTestHandler)

export default router