'use strict';

import EventSystem from '../../event/EventSystem.js';

export default class Component {
  constructor(e, name) {
    this.entity = e;
    this.name = name;
  }

  on(evtName, func, ctx){
  	(new EventSystem()).on(evtName, func, ctx);
  }
}