import { Router } from 'express';
import { createRoleHandler, deleteRoleHandler, getRoleByIdHandler, getRolePagingHandler, updateRoleHandler } from '../handler/role.handler';
import { authAdmin } from '../middlewares/authAdmin';

const router = Router()

router.post("/",authAdmin, createRoleHandler)
router.get("/:_id", authAdmin, getRoleByIdHandler)
router.get("/", authAdmin, getRolePagingHandler)
router.patch('/:_id', authAdmin, updateRoleHandler)
router.delete("/:_id", authAdmin, deleteRoleHandler)

export default router