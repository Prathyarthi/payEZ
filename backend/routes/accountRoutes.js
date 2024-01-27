import express from 'express'
import { getBalance, transfer } from '../controllers/accountController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.get('/getBalance', authMiddleware, getBalance)
router.post('/transfer', authMiddleware, transfer)

export default router