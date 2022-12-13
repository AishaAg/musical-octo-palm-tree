import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import bcrypt from 'bcrypt'

export const createToken = (id: String) => {
  const token = jwt.sign({ id: id }, JWT_SECRET)
  return token
}

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (e) {
    console.log(e)
    res.sendStatus(401)
  }
}

export const comparePasswords = (password: String, hash: String) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: String) => {
  return bcrypt.hash(password, 5)
}
