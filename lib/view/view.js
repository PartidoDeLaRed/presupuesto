import dom from 'dom';
import emitter from 'event-emitter';

export default class View {
  constructor (opts) {
    emitter(this);
    this.container = dom(opts.container);
    this.template = opts.template;
    this.model = opts.model || {};
    this._events = opts.events ? opts.events.map((ev) => ({ selector: ev[0], eventName: ev[1], fn: ev[2] })) : [];
    this.switchOn();
    this.render();
  }

  switchOn () {
    this.on('model:change', this.render.bind(this));
  }

  switchOff () {
    this.off('model:change');
  }

  attr (value) {
    if (!value) return this.model[name];
    this.model[name] = value;

    // Emit the change event to render the view with the changes
    this.emit('model:change');
    return this;
  }

  push (name, value) {
    var attr = this.model[name];

    if (attr === 'undefined') attr = [];
    else if (!(attr instanceof Array)) throw new Error('You can only push a value to an attribute of type Array');

    attr.push(value);

    // Emit the change event to render the view with the changes
    this.emit('model:change');
    return this;
  }

  addEvent (selector, eventName, fn) {
    this._events.push({ selector: selector, eventName: eventName, fn: fn });
  }

  render () {
    // DOMify template with current model state
    this.el = dom(this.template(this.model));

    // Reattach event handlers
    this._events.forEach((ev) => this.el.find(ev.selector).on(ev.eventName, ev.fn.bind(this)));

    // Render HTML in container
    this.container
      .html(' ')
      .append(this.el);
  }
}
