import path from 'path';

let html = path.resolve(__dirname, 'index.jade');

export default function (req, res) {
  res.render(html);
  return res.end();
}