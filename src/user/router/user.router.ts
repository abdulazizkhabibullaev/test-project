import { Router } from 'express'
import { createUserHandler, deleteUserHandler, getMyselfHandler, signInHandler, updateUserHandler } from '../handler/user.handler'
import { authUser } from '../middlewares/authUser'
const router = Router()

router.post('/',createUserHandler)
router.post("/login", signInHandler)
router.get("/myself", authUser, getMyselfHandler)
router.patch("/", authUser, updateUserHandler)
router.delete("/:_id", authUser, deleteUserHandler)

export default router