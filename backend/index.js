import connectToDB from './db/db.js';
import app from './app.js'
import { config } from 'dotenv'
config()

app.use('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    connectToDB()
})

