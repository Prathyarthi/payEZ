import express from 'express'
import { getUser, getUserDetails, signin, signup, updateDetails } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.put('/updateDetails', authMiddleware, updateDetails)
router.get('/getUserDetails', getUserDetails)
router.get('/getUser', authMiddleware, getUser)

export default router