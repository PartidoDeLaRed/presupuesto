import page from 'page'
import TestView from './view'

page('/test', () => {
  console.log('enter /test')
  let view = new TestView(9999)
  view.fetch()
})
