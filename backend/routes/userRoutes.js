import express from 'express'
import app from '../app'

const router = express.Router()

router.get('/user',userRouter)

export default router