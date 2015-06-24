import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let MyBudgetRowSchema = new Schema({
  category: { type: ObjectId, ref: 'Category'},
  amount: { type: Number }
})

export default mongoose.model('MyBudgetRow', MyBudgetRowSchema)
