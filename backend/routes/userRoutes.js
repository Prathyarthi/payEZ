import express from 'express'
import { signin, signup, updateDetails } from '../controllers/userController'
import { authMiddleware } from '../middlewares/userMiddleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/updateDetails', authMiddleware, updateDetails)

export default router