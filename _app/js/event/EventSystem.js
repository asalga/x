'use strict';

let instance = null;

export default class EventSystem {
  constructor() {
    if (instance == null) {
      instance = this;
      this.listeners = {};
    }
    return instance;
  }

  once(evtName, cb) {}

  on(evtName, cb, ctx) {
    // don't have any listeners for this event yet
    if (typeof this.listeners[evtName] == 'undefined') {
      // Use set so we don't have to check for duplicates
      this.listeners[evtName] = new Set;
    }
    // debugger;
    this.listeners[evtName].add({ cb, ctx });
    // console.log(this.listeners[evtName]);
  }

  fire(e) {
    let evtName = e.evtName;
    let data = e.data;

    if (typeof this.listeners[evtName] !== 'undefined') {
      this.listeners[evtName].forEach(e => {
        // debugger;
        // e.cb(data, e.ctx);
        // e.apply(e.cb, data, e.ctx);
        e.cb.call(e.ctx, data);

      });
    }
    // console.log(evtName);
  }

  off(evtName, cb) {
    if (typeof this.listeners[evtName] == 'undefined') {
      return;
    }
    this.listeners[evtName].delete(cb);
  }

  // clear() ?
}