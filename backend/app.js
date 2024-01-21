import express from 'express'
import mainRoutes from './routes/userRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', mainRoutes)

export default app