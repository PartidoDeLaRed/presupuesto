import request from 'superagent'
import View from '../view/view'
import template from './template.jade'

export default class TestView extends View {
  constructor (year) {
    super({
      container: '.main-container',
      template: template,
      model: {
        year: year,
        budget: {}
      }
    })
  }

  fetch (cb) {
    let year = this.attr('year')
    request
      .get(`/api/budget/${year}`)
      .end((err, data) => {
        if (err) {
          this.showCriticalError()
          if ('function' === typeof cb) {
            cb(err)
          }
        }

        this.attr('budget', data.body)
        if ('function' === typeof cb) {
          cb(null, data)
        }
      })
  }
}