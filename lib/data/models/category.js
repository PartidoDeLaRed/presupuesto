import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let Category = new Schema({
  name: { type: String },
  composes: { type: [String] }
})

Category.index({ id: 1 })

export default mongoose.model('Category', Category)
