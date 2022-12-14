import prisma from '../db'

export const getExpenses = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        Expense: true,
      },
    })
    res.status(200).json({ data: user.Expense })
  } catch (e) {
    next(e)
  }
}

export const getExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id,
        },
      },
    })
    res.status(200).json({ data: expense })
  } catch (e) {
    next(e)
  }
}

export const editExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.update({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id,
        },
      },
      data: req.body,
    })

    res.status(201).json({ data: expense })
  } catch (e) {
    next(e)
  }
}

export const createExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: req.body.amount,
        description: req.body.description,
        userId: req.user.id,
      },
    })
    res.status(201).json({ data: expense })
  } catch (e) {
    next(e)
  }
}

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.update({
      where: {
        id: req.params.id,
      },
      data: {
        present: false,
      },
    })
    res.json({ data: expense })
  } catch (e) {
    next(e)
  }
}

export const reAddExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.update({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id,
        },
      },
      data: {
        present: true,
      },
    })
    res.json({ data: expense })
  } catch (e) {
    next(e)
  }
}
