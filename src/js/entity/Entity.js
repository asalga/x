'use strict';

import Vec2 from '../math/Vec2.js';
import BoundingCircle from '../collision/BoundingCircle.js';

import Event from '../event/Event.js';
import EventSystem from '../event/EventSystem.js';

export default class Entity {
  constructor(cfg) {
    this.name = (cfg && cfg.name) || '';
    this.visible = true;
    this.events = true;

    this.pos = new Vec2();
    this.vel = new Vec2();
    this.acc = new Vec2();

    this.speed = 1; // velocity multiplier
    this.components = [];
    this.children = [];
    this.parent = null;
  }

  draw() {
    if (!this.visible) { return; }

    p3.save();
    this.renderProxy && this.renderProxy(p3);
    this.children.forEach(c => c.draw());

    this.components.forEach(c => {
      c.draw && c.draw();
    });

    p3.restore();
  }

  update(dt) {
    this.updateProxy && this.updateProxy(dt);

    this.components.forEach(c => {
      // ok if no update method?
      // add in entity on creation or update?

      c.update && c.update(dt, this);
      c.updateProxy && c.updateProxy(dt);
    });

    if (this.vel) {
      let d = this.vel.clone().mult(dt);
      this.pos.add(d);
    }

    this.children.forEach(c => {
      c.update(dt);
    });
  }

  addComponent(c) {
    this.components.push(c);
    this[c.name] = c;
  }

  add(e) {
    e.parent = this;
    this.children.push(e);
  }

  setEvents(b){
    this.events = b;

    // if (this.events === false) {
    //   return;
    // }

    // this.children.forEach(c => {
    //   c.setEvents(b);
    //   // c.update(dt);
    // });

    // this.components.forEach(e => {
    //   e.setEvents(b);
    // });
  }

  getWorldCoords(){
    if(this.parent){
      return Vec2.add(this.pos, this.parent.getWorldCoords());
    }
    return this.pos;
  }

  on(evtName, func, ctx) {
     (new EventSystem()).on(evtName, func, ctx);
     
    // this.eventFilter(evtName, func, ctx);
    // (new EventSystem()).on(evtName, func
      //function() {
      // if (this.events === false) { return; }
      // func.call(this, arguments[0], arguments[1], arguments[2]);
    // }.bind(this), ctx);
  }

  // on(evtName, func, ctx) {
  //   // this.eventFilter(evtName, func, ctx);
  //   (new EventSystem()).on(evtName, function() {
  //     if (this.events === false) { return; }
  //     func(arguments);
  //   }.bind(this), ctx);
  // }

  removeComponent(c) {
    debugger;
    console.log('needs impl');
  }
}