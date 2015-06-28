import mongoose from 'mongoose'
import debug from 'debug'
import MyBudgetRow from './myBudgetRow'

const log = debug('presupuesto:data:models:mybudget')
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let MyBudgetSchema = new Schema({
	rows: { type: [MyBudgetRow] },
 	createdAt: { type: Date, default: Date.now }
})

log('MyBudget model initialized')

export default mongoose.model('MyBudget', MyBudgetSchema)
