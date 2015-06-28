import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('presupuesto:data:models:category')
let Schema = mongoose.Schema;

let Category = new Schema({
  name: { type: String },
  composes: { type: [String] }
})

log('Category model initialized')

export default mongoose.model('Category', Category)
