import express from 'express'
import { getBalance } from '../controllers/accountController.js'

const router = express.Router()

router.get('/getBalance',getBalance)

export default router