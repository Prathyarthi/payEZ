import express from 'express'
import { getUserDetails, signin, signup, updateDetails } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/updateDetails', authMiddleware, updateDetails)
router.get('/getUserDetails', getUserDetails)

export default router