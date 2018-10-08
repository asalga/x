'use strict';

import Vec2 from '../math/Vec2.js';
import BoundingCircle from '../collision/BoundingCircle.js';

import Event from '../event/Event.js';
import EventSystem from '../event/EventSystem.js';

import Utils from '../Utils.js';

export default class Entity {
  constructor(cfg) {

    cfg && Utils.applyProps(this, cfg);

    this.visible = true;
    this.events = true;

    this.pos = new Vec2();
    this.vel = new Vec2();
    this.acc = new Vec2();
    this.rot = 0;

    // TODO: fix
    this.speed = 1;
    this.timeScale = 1;
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
    // sanity check
    if (Number.isNaN(this.vel.x)) { debugger; }

    // let deltaTime = dt * this.timeScale;
    let deltaTime = dt;// * this.timeScale;

    this.updateProxy && this.updateProxy(deltaTime);

    this.components.forEach(c => {
      // ok if no update method?
      // add in entity on creation or update?
      c.update && c.update(dt, this);
      c.updateProxy && c.updateProxy(dt);
    });

    if (this.vel) {
      let d = this.vel.clone().mult(deltaTime * this.timeScale);
      this.pos.add(d);
    }

    this.children.forEach(c => {
      c.update(deltaTime);
    });
  }

  add(e) {
    e.parent = this;
    this.children.push(e);
  }

  removeDirectChild(e) {
    let res = Utils.removeFromArray(this.children, e);
  }

  removeChild(e){
    debugger;
  }

  // TODO: fix
  hasChild(name) {
    let found = false;

    for (let i = 0; i < this.children.length; ++i) {
      if (this.children[i].name === name) {
        return true;
      }

      if (this.children[i].children.length > 0) {
        return this.children.children.hasChild(name);
      }
    }
    return false;
  }

  getRoot() {
    if (this.parent === null) {
      return this;
    }
    return this.parent.getRoot();
  }

  addComponent(c) {
    this.components.push(c);
    this[c.name] = c;
  }

  removeComponent(c) {
    Utils.removeFromArray(this.components, c);
    this.components[c.name] = undefined;
  }

  setEvents(b) {
    this.events = b;
  }

  getWorldCoords() {
    if (this.parent) {
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
}