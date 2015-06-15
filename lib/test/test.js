import page from 'page'
import TestView from './view'

page('/test', () => {
  let view = new TestView(2013)
  view.fetch()
})
