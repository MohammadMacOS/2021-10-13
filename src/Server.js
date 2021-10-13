import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Logger from "./utils/Logger.js";

dotenv.config()
const app = express()
const port =process.env.PORT
const environment = process.env.NODE_ENV
const mongodb_url = process.env.MONGODB_URL
const dbName = process.env.MONGO_DB_NAME
const dbCollection = process.env.MONGODB_COLLECTION

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// APi Alive
app.get('/', (req, res) => {
    res.send('Api is Alive!')
})

function isServerInDevelopmentMode() {
    const devEnv = 'development'
    const env = environment || devEnv
    const isDevelopment = env === devEnv
    if (isDevelopment) {
        Logger.warn('Server is in development mode!'.toUpperCase())
    }
}

app.listen(port, () => {
    isServerInDevelopmentMode()
   Logger.info(`server started att http://localhost:${ port }`)

})