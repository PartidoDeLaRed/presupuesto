import page from 'page';
import template from './template.jade';
import View from '../view/view.js';

page('/', () => {
  let view = new View({
    container: '.main-container',
    template: template,
    model: {
      tasks: []
    },
    events: [
      ['.add-link', 'click', () => view.push('tasks', view.el.find('.new-task')[0].value) ]
    ]
  });
});