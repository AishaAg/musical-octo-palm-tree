import { validationResult } from 'express-validator'

const validator = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors.array())
    res.status(400).json({ errors: errors.array() })
    return
  }
  next()
}

export default validator
