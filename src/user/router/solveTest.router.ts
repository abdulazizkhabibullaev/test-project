import {Router} from 'express'
import { finishTestHandler, solveTestHandler, startTestHandler } from '../handler/solveTest.handler'
import { authUser } from '../middlewares/authUser'

const router = Router()

router.post('/', authUser, solveTestHandler)
router.post('/startTest', authUser, startTestHandler)
router.post('/finishTest', authUser, finishTestHandler)

export default router