import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const start = () => {
  app.listen(3000, () => {
    console.log('running on http://localhost:3000')
  })
}
