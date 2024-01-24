import express from 'express'
import { getBalance, transfer } from '../controllers/accountController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.get('/getBalance', authMiddleware, getBalance)
router.get('/transfer', authMiddleware, transfer)

export default router