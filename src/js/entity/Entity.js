'use strict';

import Vec2 from '../math/Vec2.js';
import BoundingCircle from '../collision/BoundingCircle.js';

import Event from '../event/Event.js';
import EventSystem from '../event/EventSystem.js';

import Utils from '../Utils.js';

export default class Entity {
  constructor(cfg) {

    cfg && Utils.applyProps(this, cfg);

    this.id = Utils.getId();

    this.visible = true;
    this.opacity = 1;

    this.events = true;
    this.registeredEvents = new Map();

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

  setup(){}

  draw() {
    // if (!this.visible) { return; }

    p3.save();

    this.renderProxy && this.renderProxy(p3);
    // this.children.forEach(c => c.draw());

    // // TODO: fix
    // this.components.forEach(c => {
    //   c.draw && c.draw();
    // });

    p3.restore();
  }

  setPropertyRecursive(name, v) {
    debugger;
  }

  update(dt) {
    // sanity check
    if (Number.isNaN(this.vel.x)) { debugger; }

    // let deltaTime = dt * this.timeScale;
    let deltaTime = dt; // * this.timeScale;

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

  /*
    If a component needs to remove the associate entity,
    give it a method that abstracts out whether the entity
    is in a scenegraph or directly in the scene.
  */
  removeSelf() {
    if (this.parent) {
      this.parent.removeDirectChild(this);
    } else {
      scene.remove(this);
    }
  }

  removeDirectChild(e) {
    let res = Utils.removeFromArray(this.children, e);
  }

  removeChild(e) {
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
    if (this[c.name]) {
      console.log(`Warning: ${this.name} already has ${c.name}`);
    }
    this.components.push(c);
    this[c.name] = c;
  }

  removeComponent(c) {
    Utils.removeFromArray(this.components, c);
    this.components[c.name] = undefined;
    // this.components[c.name] = Utils.undef;
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

  on(evtName, cb, ctx, cfg) {
    this.registeredEvents.set(evtName, cb);
    (new EventSystem()).on(evtName, cb, ctx, cfg);
  }

  off(evtName, cb) {
    (new EventSystem()).off(evtName, cb);
  }

  indicateRemove() {
    this.children.forEach(c => c.indicateRemove());
    this.components.forEach(c => c.indicateRemove());

    this.registeredEvents.forEach((cb, evtName) => this.off(evtName, cb));
  }
}