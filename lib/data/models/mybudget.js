import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let MyBudgetSchema = new Schema({
	rows: { type: [MyBudgetRow] },
 	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MyBudget', MyBudgetSchema)
