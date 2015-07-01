import mongoose from 'mongoose'
import debug from 'debug'
import MyBudgetItem from './mybudget-item'

const log = debug('presupuesto:data:models:mybudget')
let Schema = mongoose.Schema;

let MyBudgetSchema = new Schema({
	rows: { type: [Schema.Types.Mixed] },
	//rows: { type: [MyBudgetItem] },
 	createdAt: { type: Date, default: Date.now }
})

log('MyBudget model initialized')

export default mongoose.model('MyBudget', MyBudgetSchema)
