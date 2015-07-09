import debug from 'debug'
import MyBudget from '../models/mybudget'
import * as Category from './category'

const log = debug('presupuesto:data:api:mybudget')

export function findById (id, cb) {
  Category.getAll((err, categories) => {
    MyBudget.findOne({ _id: id })
    .exec((err, myBudget) => {
      if (!myBudget) {
        return cb()
      }
      let b = myBudget
      b.rows = myBudget.rows.map(row => {
        row.category = categories.filter(c => c._id.toString() == row.category)[0]
        return row
      })
      cb(null, b)
    })
  })
}

/**
 * Main entry point for creating a MyBudget object to
 * save to mongo.
 */

export function create (data, cb) {
  log(`Creating new MyBudget: %j`, data)
  const myBudget = new MyBudget(data)
  myBudget.save((err, data) => {
    if (err) {
      return cb(err)
    }
    log(`MyBudget saved: %j`, data)
    cb(null, data)
  })
}

export function getAll (cb) {
  log('Querying all MyBudgets')
  MyBudget
    .find()
    .exec(cb)
}

export function getAverage (cb) {
  let output = []
  log(`Querying average`)
  Category.getAll((err, categories) => {
    log(`Categories fetched`)
    getAll((err, budgets) => {
      log(`MyBudgets fetched`)
      categories.forEach(cat => {
        log(`Processing category %j`, cat)
        let row = {}
        row.category = cat
        row.amount = 0
        row.count = 0
        budgets.forEach(b => {
          b.rows.forEach(r => {
            if (r.category === cat._id.toString()) {
              row.amount += +r.amount
              row.count++
            }
          })
        })
        row.average = row.count > 0 ? row.amount / row.count : 0;
        log(`Category completed: %j`, row)
        output.push(row)
      })
      cb(null, output)
    })
  })
}