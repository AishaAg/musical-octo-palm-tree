import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { changePassword, createUser, signin } from './handlers/user'
import { body } from 'express-validator'
import validator from './modules/validators'
import { verifyToken } from './modules/auth'
import prisma from './db'
import router from './router'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(
  '/user',
  body(['username', 'password']).exists().isString(),
  validator,
  createUser
)
app.post(
  '/signin',
  body(['username', 'password']).exists().isString(),
  validator,
  signin
)

app.post(
  '/change-password',
  verifyToken,
  body('password').exists().isString(),
  validator,
  changePassword
)

app.use('/expense', router)

app.use((err, req, res, next) => {
  if (err.code === 'P2002') {
    res.sendStatus(409)
  } else {
    res.status(500).json({ message: 'Some error occured' })
  }
})

export const start = () => {
  prisma.user.deleteMany({})
  app.listen(3000, () => {
    console.log('running on http://localhost:3000')
  })
}
