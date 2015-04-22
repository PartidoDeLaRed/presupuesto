var View = require('../view/view.js');
var template = require('./template.jade');

module.exports = new View({
  container: '.footer-container',
  template: template
});
