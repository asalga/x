'use strict';

let instance = null;

export default class EventSystem {
  constructor() {
    if (instance === null) {
      instance = this;
      this.listeners = {};
    }
    return instance;
  }

  once(evtName, cb) {}

  printDebug() {
    Debug.add('Event System');
    
    Object.keys(this.listeners).forEach(listener => {
      let list = this.listeners[listener];
      Debug.add(`  ${listener} : ${list.size} `);
    });
  }

  on(evtName, cb, ctx, cfg) {
    // don't have any listeners for this event yet
    if (typeof this.listeners[evtName] === 'undefined') {
      // Use set so we don't have to check for duplicates
      this.listeners[evtName] = new Set();
    }

    // create the event object
    this.listeners[evtName].add({ cb, ctx, cfg });
  }

  fire(e) {
    let evtName = e.evtName;
    let data = e.data;

    if (typeof this.listeners[evtName] === 'undefined') {
      return;
    }

    // Tell all the listeners about this event
    this.listeners[evtName].forEach(evtObj => {

      if (!evtObj.ctx) { debugger; }

      if (evtObj.ctx.entity) {

        // 
        if (evtObj.ctx.entity.events === false) {
          return;
        }
      }

      if (evtObj.ctx) {

        // If the listener only wants events that occured on itself
        if (evtObj.cfg && evtObj.cfg.onlySelf) {

          let found = false;
          Object.values(data).forEach(v => {
            if (v === evtObj.ctx) {
              found = true;
            }
          });

          if (found === false) { return; }
        }

        // The collision system doesn't know about how the
        // listeners will consume the data, so it's up to the event
        // system to order the values nicely for the listeners.
        // This makes the logic in the collision listeners much cleaner.
        //
        // swap, if they are in the wrong order
        if (data.other === evtObj.ctx) {
          [data.other, data.self] = [data.self, data.other];
        }

        evtObj.cb.call(evtObj.ctx, data);
      } else {
        evtObj.cb(data);
      }

    });
  }

  off(evtName, cb) {
    if (typeof this.listeners[evtName] === 'undefined') {
      return;
    }

    for (let e of this.listeners[evtName]) {
      if (e.cb === cb) {
        this.listeners[evtName].delete(e);
        return;
      }
    }
  }

  clear() {
    this.listeners = {};
  }
}