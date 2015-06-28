import mongoose from 'mongoose'
import MyBudgetRow from './myBudgetRow'

let Schema = mongoose.Schema;
//let ObjectId = Schema.ObjectId;

let MyBudgetSchema = new Schema({
	rows: { type: [Schema.Types.Mixed] },
 	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MyBudget', MyBudgetSchema)
