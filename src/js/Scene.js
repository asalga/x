'use strict';

import EntityFactory from './entity/EntityFactory.js';
import EventSystem from './event/EventSystem.js';

export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;

    // dirty flag
    this.entitiesAddedOrRemoved = false;
    this.deleteQueue = [];
  }

  update(dt) {
    this.deleteQueue.forEach(e => {
      this.entities.delete(e);
      // debugger;
    })

    this.entities.forEach(e => e.update(dt));
  }

  clearFlags() {
    this.entitiesAddedOrRemoved = false;
  }

  draw(p3) {
    this.entities.forEach(e => e.draw(p3));
  }

  addUser(u) {
    this.user = u;
    this.entities.add(u);
    this.entitiesAddedOrRemoved = true;
  }

  add(e) {
    this.entities.add(e);
    this.entitiesAddedOrRemoved = true;
  }

  restartGame() {
    this.entities.clear();
    this.deleteQueue = [];

    let e = new EventSystem();
    e.clear();

    let user = EntityFactory.create('user');
    this.addUser(user);

    for (let i = 0; i < 5; ++i) {
      let m = EntityFactory.create('mouse');
      this.add(m);
    }

    for (let i = 0; i < 10; ++i) {
      let b = EntityFactory.create('bullet');
      b.pos.set(i * 40, p3.height/2);
      this.add(b);
    }
  }

  remove(e) {
    this.deleteQueue.push(e);
    this.entitiesAddedOrRemoved = true;
  }

  getUser() {
    return this.user;
  }

}