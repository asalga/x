'use strict';

import Vec2 from '../math/Vec2.js';
import BoundingCircle from '../collision/BoundingCircle.js';

import Event from '../event/Event.js';
import EventSystem from '../event/EventSystem.js';

import Utils from '../Utils.js';

// tempvec
let _v = new Vec2();

export default class Entity {
  constructor(cfg) {
    let defaults = {
      opacity: 1,
      visible: true
    };
    Utils.applyProps(this, defaults, cfg);

    this.id = Utils.getId();

    this.eventsOn = true;
    // this.registeredEvents = new Map();
    this.registeredEvents = [];

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

  setup() {}

  draw() {
    // now taken care of in the Renderer
    // if (!this.visible) { return; }
    p3.save();

    this.renderProxy && this.renderProxy(p3);
    // this.children.forEach(c => c.draw());

    // TODO: fix
    // this.components.forEach(c => {c.draw && c.draw();});
    p3.restore();
  }

  // TODO: yup, implement this too
  setPropertyRecursive(name, v) {
    /*jshint -W087 */
    debugger;
  }

  update(dt) {
    // TODO: replace with assert
    if (Number.isNaN(this.vel.x)) {
      /*jshint -W087 */
      debugger;
    }

    // let deltaTime = dt * this.timeScale;
    let deltaTime = dt; // * this.timeScale;

    this.updateProxy && this.updateProxy(deltaTime);

    this.components.forEach(c => {
      // ok if no update method?
      // add in entity on creation or update?
      c.update && c.update(dt, this);
      c.updateProxy && c.updateProxy(dt);
    });
//
    if (this.vel) {
      //let d = this.vel.clone().mult(deltaTime * this.timeScale);

      _v.set(this.vel);
      Vec2.multSelf(_v, deltaTime * this.timeScale);

      // let [x, y] = [
        // this.vel.x * deltaTime * this.timeScale,
        // this.vel.y * deltaTime * this.timeScale
      // ];
      this.pos.x += _v.x;
      this.pos.y += _v.y;

      // Vec2.addSelf(this.pos,  );
      // this.pos.add(d);
    }

    this.children.forEach(c => {
      c.update(deltaTime);
    });

    // Debug.add(`Entity #${this.id} "${this.name}" ${this.pos.x} `);
    // if (this.health) {Debug.add(`Entity ${this.health.amt} `);}
    // Health: ${this.health.amt}`
  }

  /*
    c - child entity
  */
  add(c) {
    c.parent = this;
    this.children.push(c);
    new Event({ evtName: 'childaddedtoparent', data: { parent: this, child: c } }).fire();
  }

  /*
    Move node from parent to scene/root
  */
  detachFromParent() {
    scene.add(this);
    this.parent.removeDirectChild(this);
  }

  /*
    If a component needs to remove the associate entity,
    give it a method that abstracts out whether the entity
    is in a scenegraph or directly in the scene.
  */
  removeSelf() {
    // console.log('remove self:', this.name);
    if (this.parent) {
      this.parent.removeDirectChild(this);
    } else {
      scene.remove(this);
    }
  }

  removeDirectChild(e) {
    let res = Utils.removeFromArray(this.children, e);
    e.parent = null;
    return res;
  }

  removeChild(e) {
    /*jshint -W087 */
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

  /*
    TODO: move this. This is too specific to live on Entity
    TODO: Keep track of which ones are already off?    

    - Should this be generalized into setChildEnabled(b)?
  */
  setWeaponsEnabled(b) {
    this.children.filter(c => c.launcher)
      .forEach(e => e.launcher.setEnable(b));
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

  removeComponentByName(str) {
    let c = this.components[str];
    if (c) {
      Utils.removeFromArray(this.components, c);
      return true;
    }
    return false;
  }

  setEvents(b) {
    this.eventsOn = b;
  }

  getWorldCoords() {
    if (this.parent) {
      return Vec2.add(this.pos, this.parent.getWorldCoords());
    }
    return this.pos;
  }

  /*
    Returns the event ID which the calling code can use
    to turn the event off
  */
  on(evtName, cb, ctx, cfg) {
    let id = Events.on(evtName, cb, ctx, cfg);
    this.registeredEvents.push(id);
    return id;
  }

  off(id) {
    Utils.removeFromArray(this.registeredEvents, id);
    Events.off(id);
  }

  indicateRemove() {
    this.children.forEach(c => c.indicateRemove());
    this.components.forEach(c => c.indicateRemove());

    // don't call off(), since we don't want to modify an
    // array while we iterate over it.
    this.registeredEvents.forEach(id => Events.off(id));
    // this.registeredEvents = [];
    Utils.clearArray(this.registeredEvents);
  }
}