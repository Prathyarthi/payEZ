import connectToDB from './db/db';
import express from ("express");
import app from './app'
require('dotenv/config')

app.use('/', (req,res) => {
    res.send('Hello World!')    
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    connectToDB()
})

