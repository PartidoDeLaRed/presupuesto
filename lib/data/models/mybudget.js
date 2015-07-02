import mongoose from 'mongoose'
import debug from 'debug'
import MyBudgetItem from './mybudget-item'

const log = debug('presupuesto:data:models:mybudget')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const MyBudgetSchema = new Schema({
	rows: { type: [Schema.Types.Mixed] },
 	createdAt: { type: Date, default: Date.now() }
})

log('MyBudget model initialized')

export default mongoose.model('MyBudget', MyBudgetSchema)
