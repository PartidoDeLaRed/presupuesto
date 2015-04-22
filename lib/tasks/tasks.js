var page = require('page');
var template = require('./template.jade');
var View = require('../view/view.js');

page('/', function (ctx, next) {
  var view = new View({
    container: '.main-container',
    template: template,
    model: {
      tasks: []
    },
    events: [
      ['.add-link', 'click', function (ev) {
        this.push('tasks', this.el.find('.new-task')[0].value);
      }]
    ]
  });
});