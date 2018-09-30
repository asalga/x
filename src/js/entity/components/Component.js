'use strict';

import EventSystem from '../../event/EventSystem.js';

export default class Component {
  constructor(e, name) {
    this.entity = e;
    this.name = name;
    this.events = true;
  }

  update(dt){
  	this.updateProxy && this.updateProxy(dt);
  }

  on(evtName, func, ctx) {
    // this.eventFilter(evtName, func, ctx);
    (new EventSystem()).on(evtName, function() {
      if (this.events === false) { return; }
      func.call(this, arguments[0], arguments[1], arguments[2]);
    }.bind(this), ctx);
  }

  // on(evtName, func, ctx){    
  // 	(new EventSystem()).on(evtName, func, ctx);
  // }

  setEvents(b){
    this.events = b;
  }
}