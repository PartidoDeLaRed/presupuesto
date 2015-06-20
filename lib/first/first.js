import page from 'page';
import View from '../view/view.js';
import template from './template.jade';

page('/first', () => {
  let view = new View({
    container: '.main-container',
    template: template,
    model: {
      title: 'Presupuestate'
    }
  });
});