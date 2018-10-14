'use strict';

let instance = null;

import Utils from '../Utils.js';

export default class EventSystem {
  constructor() {
    if (instance === null) {
      instance = this;
      this.listeners = {};
    }
    return instance;
  }

  // once(evtName, cb) {}

  printDebug() {
    Debug.add('Event System');

    Object.keys(this.listeners).forEach(listener => {
      let list = this.listeners[listener];
      Debug.add(`  ${listener} : ${list.size} `);
    });
  }

  /*
    Register an event

    returns an id which we can use to turn the event off.
  */
  on(evtName, cb, ctx, cfg) {

    // We don't have any listeners for this event yet
    if (typeof this.listeners[evtName] === 'undefined') {
      this.listeners[evtName] = new Map();
    }

    let id = Utils.getId();
    this.listeners[evtName].set(id, { cb, ctx, cfg });
    return id;
  }

  fire(e) {
    let evtName = e.evtName;

    // no listeners exist yet
    if (typeof this.listeners[evtName] === 'undefined') {
      console.warn('no listeners setup yet');
      return;
    }

    // If the 'collision' event was fired, we need to tell 
    // all the listeners about this event

    let evtObjs = this.listeners[evtName];

    evtObjs.forEach((v, k) => {
      let evtObj = v;
      let data = e.data;

      // TODO: wtf?
      if (!evtObj.ctx) { debugger; }

      // TODO: rename to eventsOn
      if (evtObj.ctx.entity && evtObj.ctx.entity.events === false) {
        return;
      }

      if (evtObj.ctx) {

        // If the listener only wants events that occured on itself
        if (evtObj.cfg && evtObj.cfg.onlySelf) {

          let foundSelf = false;

          console.log(data.ctx);

          // TODO: use filter?
          Object.values(data).forEach(v => {
            
            // console.log("...>", v);

            if (v === evtObj.ctx) {
              foundSelf = true;
            }
          });

          if (foundSelf === false) { return; }
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

  /*
   */
  off(id) {
    let res = false;

    // Iterate over all the eventNames
    let eventNames = Object.values(this.listeners);

    eventNames.forEach(li => {
      if (li.has(id)) {
        res = li.delete(id);
      }
    });

    return res;
  }

  clear() {
    // be super careful when calling this!
    debugger;
    this.listeners = {};
  }
}