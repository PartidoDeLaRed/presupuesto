import path from 'path'
import config from '../config'

let html = path.resolve(__dirname, 'index.jade')

export default function (req, res) {
  res.render(html, { config: config })
  return res.end()
}