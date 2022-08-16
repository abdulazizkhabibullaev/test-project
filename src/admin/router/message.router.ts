import { Router } from 'express'
import { getMessageByIdHandler, getMessagePagingHandler } from '../handler/message.handler'
import { authAdmin } from '../middlewares/authAdmin'

const router = Router()

router.get('/', authAdmin, getMessagePagingHandler)
router.get('/:_id', authAdmin, getMessageByIdHandler)

export default router