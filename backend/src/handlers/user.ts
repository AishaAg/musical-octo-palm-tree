import prisma from '../db'
import { comparePasswords, createToken, hashPassword } from '../modules/auth'

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        budget: req.body.budget,
      },
    })
    const token = createToken(user.id)
    res.status(201).json({ token })
  } catch (e) {
    next(e)
  }
}

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    })
    console.log(user)
    const isValid = await comparePasswords(req.body.password, user.password)
    if (!isValid) {
      res.sendStatus(401)
      return
    }
    const token = createToken(user.id)
    res.json({ token })
  } catch (e) {
    next(e)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: req.body.password,
      },
    })
    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(201)
  }
}
