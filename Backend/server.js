import dotenv from 'dotenv'
import app from './app.js'
import { connectMongoDatabase } from './config/db.js'

dotenv.config({
  path: './backend/config/config.env',
})

connectMongoDatabase()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
