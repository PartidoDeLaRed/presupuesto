import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('presupuesto:data:models:budget')
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let BudgetSchema = new Schema({
  year: { type: Number },
  category: { type: ObjectId, ref: 'Category'},
  amount: { type: Number }
})

BudgetSchema.index({ year: 1 })

log('Budget model initialized')

export default mongoose.model('Budget', BudgetSchema)
