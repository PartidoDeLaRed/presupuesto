var dom = require('dom');
var emitter = require('event-emitter');

function View (opts) {
  emitter(this);
  this.container = dom(opts.container);
  this.template = opts.template;
  this.model = opts.model || {};
  this._events = opts.events ? opts.events.map(function (ev) { return { selector: ev[0], eventName: ev[1], fn: ev[2] } }) : [];
  this.switchOn();
  this._render();
}

View.prototype.switchOn = function () {
  this.on('model:change', this._render.bind(this));
};

View.prototype.switchOff = function () {
  this.off('model:change');
};

/*
 * Gets or sets an attribute value
 * Side effects: in case of setting a value, the `render` function will be triggered.
 * In case of set, returns the current View instance. In case of get, returns the value of the attribute.
 */

View.prototype.attr = function (name, value) {
  if (!value) return this.model[name];
  this.model[name] = value;

  // Emit the change event to render the view with the changes
  this.emit('model:change');
  return this;
};

/*
 * Push a value to an attribute of type array.
 * Side effects: it implies a model change, so the `render` function will be triggered.
 * Returns the current View instance.
 */

View.prototype.push = function(name, value) {
  var attr = this.model[name];

  if (attr === 'undefined') attr = [];
  else if (!(attr instanceof Array)) throw new Error('You can only push a value to an attribute of type Array');

  attr.push(value);

  // Emit the change event to render the view with the changes
  this.emit('model:change');
  return this;
};

View.prototype.addEvent = function(selector, eventName, fn) {
  this._events.push({ selector: selector, eventName: eventName, fn: fn });
};

View.prototype._render = function () {
  // DOMify template with current model state
  this.el = dom(this.template(this.model));

  // Reattach event handlers
  this._events.forEach(function (ev) {
    this.el.find(ev.selector).on(ev.eventName, ev.fn.bind(this));
  }.bind(this));

  // Render HTML in container
  this.container
    .html(' ')
    .append(this.el);
};

module.exports = View;
