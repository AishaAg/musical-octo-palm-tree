import { Router } from 'express'
import { body } from 'express-validator'
import {
  createExpense,
  deleteExpense,
  editExpense,
  getExpense,
  getExpenses,
  reAddExpense,
} from './handlers/expenses'
import { verifyToken } from './modules/auth'
import validator from './modules/validators'

const router = Router()

router.use(verifyToken)

router.get('/', getExpenses)
router.get('/:id', getExpense)
router.post(
  '/',
  body(['amount', 'description']).exists(),
  body('amount').isNumeric(),
  validator,
  createExpense
)
router.put('/:id', editExpense)
router.delete('/:id', deleteExpense)
router.patch('/:id', reAddExpense)

export default router
