import { Router } from 'express'
import { createMessageHandler } from '../handler/message.handler'
import { authUser } from '../middlewares/authUser'

const router = Router()

router.post('/', authUser, createMessageHandler)

export default router

