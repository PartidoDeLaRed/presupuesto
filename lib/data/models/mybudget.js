import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let MyBudgetSchema = new Schema({
})

export default mongoose.model('MyBudget', MyBudgetSchema)
