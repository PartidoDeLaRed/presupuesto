import mongoose from 'mongoose'

let Schema = mongoose.Schema;

let Category = new Schema({
  name: { type: String },
  composes: { type: [String] }
})

export default mongoose.model('Category', Category)
