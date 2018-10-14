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

  // The collision system doesn't know about how the
  // listeners will consume the data, so it's up to the event
  // system to order the values nicely for the listeners.
  // This makes the logic in the collision listeners much cleaner.
  reorderEntities(data, evtObj) {
    if (data.self === evtObj.ctx) return;
    [data.other, data.self] = [data.self, data.other];
  }

  // Occurs on the WeaponSwitcher
  eventsAreOffForEntity(ctx) {
    if (!ctx.entity) return false;
    return !ctx.entity.eventsOn;
  }

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

    if (typeof this.listeners[evtName] === 'undefined') {
      // console.warn(`${e.data.name} is not listening to "${evtName}"`);
      // console.warn(`There isn't anything listening to: "${evtName}"`);
      return;
    }

    let evtObjs = this.listeners[evtName];

    evtObjs.forEach((evtObj, k) => {
      let data = e.data;

      // TODO: wtf?
      if (!evtObj.ctx) {
        evtObj.cb(data);
        return;
      }

      if (this.eventsAreOffForEntity(evtObj.ctx)) { return; }

      this.reorderEntities(data, evtObj);

      // If the listener only wants events that occured on itself
      if (evtObj.cfg && evtObj.cfg.onlySelf) {
        let res = Object.values(data).filter(v => v === evtObj.ctx);
        if (res.length === 0) return;
      }

      evtObj.cb.call(evtObj.ctx, data);
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