import debug from 'debug'
import MyBudget from '../models/mybudget'
import MyBudgetItem from '../models/mybudget-item'
import Category from '../models/category'
import * as CategoryApi from './category'

let log = debug('presupuesto:data:api:mybudget')
let budgetRows = []

/**
 * Main entry point for creating a MyBudget object to
 * save to mongo.
 */

export function create (data, cb) {
  log(`Creating new MyBudget: %j`, data)
  extractBudgets(data, () => {
    saveMyBudget(() => {
      cb()
    })
  })
}

/**
 * Creates a user budget with budget category rows and a createdAt date time
 * and saves it to mongo.
 */

export function saveMyBudget (cb) {
  log(`Saving budget with rows: %j`, budgetRows)
  const userBudget = new MyBudget({ rows: budgetRows })
  log(`UserBudget created: %j %j`, userBudget.rows, userBudget.createdAt)

  userBudget.save((err, data) => {
    if (err) {
      return cb(err)
    }
    log(`UserBudget saved: %j`, data)
    cb(null, data)
  })
}

/**
 * Takes the array of categories and amounts sent by the client
 * gets a Category object for each and saves MyBudgetItems in an
 * array of budgets.
 */

export function extractBudgets (budgets, cb) {
  log(`Extracting category budgets from: %j`, budgets)

  for (var i = 0; i < budgets.length; i++) {
    let categoryBudget = budgets[i];
    let categoryId = categoryBudget.id
    let categoryAmount = new Number(parseFloat(categoryBudget.amount))

    // get a category by id
    CategoryApi.getCategoryById(categoryId,
      () => {
        log(`Error getting category %j: %j`, categoryId, err)
        return handleError(res)
      },
      data => {
        log(`Category read: %j`, data)

        // instantiate a MyBudgetItem with category and amount
        let myBudgetItem = new MyBudgetItem({ category: data, amount: categoryAmount })

        log(`MyBudgetItem created: %j %j`, myBudgetItem.category, myBudgetItem.amount)
        budgetRows.push(myBudgetItem)

        // if all budgets where added, return
        if (budgetRows.length === budgets.length) {
          cb()
        }
      }
    )
  }
}
