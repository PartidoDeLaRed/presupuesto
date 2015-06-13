import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let Category = new Schema({
  id: { type: Number },
  name: { type: String },
  composes: { type: [String] }
})

Category.index({ id: 1 })

export default mongoose.model('Category', Category)
