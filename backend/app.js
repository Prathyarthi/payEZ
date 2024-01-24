import express from 'express'
import mainRoutes from './routes/userRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', mainRoutes)
app.use('/api/v1/accounts', accountRoutes)

export default app