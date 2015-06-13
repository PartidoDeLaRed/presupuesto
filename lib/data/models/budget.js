import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let BudgetSchema = new Schema({
  year: { type: Number },
  category: { type: ObjectId, ref: 'Category'},
  amount: { type: Number }
})

BudgetSchema.index({ year: 1 })

export default mongoose.model('Budget', BudgetSchema)
