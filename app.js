require('dotenv').config()
const connectDB = require('./database/db')
const taskRoute = require('./routes/taskRoute')
const notFound = require('./middlewares/404')
const errorHandler = require('./middlewares/error-handler')
const express = require('express')
const app = express()

// Middleware

app.use(express.json())
app.use(express.static('public'))

// Routes

app.use('/api/v1/tasks', taskRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = 3000

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()