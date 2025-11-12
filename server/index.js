import express from 'express'
import 'dotenv/config'
import createTables from './helpers/createTable.js'
import petRoute from './routes/petRoute.js'
import userRouter from './routes/userRoute.js'


const app = express()
app.use(express.json())

createTables()

app.use('/pet', petRoute)
app.use('/user', userRouter)


app.listen(8000, (req, res) => {
    console.log('Server was started! http://localhost:8000')
})