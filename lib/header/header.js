var View = require('../view/view.js');
var template = require('./template.jade');

module.exports = new View({
  template: template,
  container: '.header-container',
  model: { title: 'My tasks' }
});
