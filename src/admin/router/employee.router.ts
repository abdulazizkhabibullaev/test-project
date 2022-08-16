import { Router } from 'express'
import { createEmployeeHandler, deleteEmployeeHandler, getEmployeeByIdHandler, getEmployeePagingHandler, signInHandler, updateEmployeeHandler } from '../handler/employee.handler'
import { authAdmin } from '../middlewares/authAdmin'
const router = Router()

router.post('/', authAdmin, createEmployeeHandler)
router.post("/login", signInHandler)
router.get('/', authAdmin, getEmployeePagingHandler)
router.get("/:_id", authAdmin, getEmployeeByIdHandler)
router.patch("/:_id", authAdmin, updateEmployeeHandler)
router.delete("/:_id", authAdmin, deleteEmployeeHandler)

export default router