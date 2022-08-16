import { Router } from 'express'
import { myResultsHandler, myStatisticsHandler, testResultsHandler } from '../handler/testResult.handler'
import { authUser } from '../middlewares/authUser'

const router = Router()

router.get('/myResults', authUser, myResultsHandler)
router.get('/myStats', authUser, myStatisticsHandler)
router.get('/:_id', authUser, testResultsHandler)


export default router