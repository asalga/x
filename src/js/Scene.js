'use strict';

import EntityFactory from './entity/EntityFactory.js';
import EventSystem from './event/EventSystem.js';
import Event from './event/Event.js';

export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;
    this.timer = 0;

    // dirty flag
    this.entitiesAddedOrRemoved = false;
    this.deleteQueue = [];
  }

  update(dt) {
    this.deleteQueue.forEach(e => {
      this.entities.delete(e);
      new Event({ evtName: 'death', data: e }).fire();
    });

    this.timer += dt;
    if (this.timer > 1.5) {
      this.timer = 0;
      this.add(EntityFactory.create('mouse'));
    }

    this.entities.forEach(e => e.update(dt));
  }

  getRandomBaddie() {
    let b;
    this.entities.forEach(e => {
      if (e.killable) {
        b = e;
      }
    });
    return b;
  }

  clearFlags() {
    this.entitiesAddedOrRemoved = false;
  }

  draw(p3) {
    // this.entities.forEach(e => e.draw(p3));
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

    let s = EntityFactory.create('starfish');
    s.pos.x = 550;
    s.pos.y = 150;
    this.add(s);

    // for (let i = 0; i < 15; ++i) {
    //   this.add(EntityFactory.create('mouse'));
    // }

    // let b = EntityFactory.create('bee');
    // this.bee = b;
    // this.add(b);
  }

  remove(e) {
    this.deleteQueue.push(e);
    this.entitiesAddedOrRemoved = true;
  }

  getUser() {
    return this.user;
  }
}