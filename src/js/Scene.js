'use strict';

import EntityFactory from './entity/EntityFactory.js';
import EventSystem from './event/EventSystem.js';
import Event from './event/Event.js';
import Spawner from './entity/actors/Spawner.js';

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

    // Seems like this is the best place for this flag 
    // to be turned on.
    if (this.deleteQueue.length > 0) {
      this.entitiesAddedOrRemoved = true;
    }

    this.deleteQueue.forEach(e => {
      new Event({ evtName: 'death', data: e }).fire();
      // console.log('death called');

      this.entities.delete(e);
    });

    // Allow the entities to do any cleanup
    this.deleteQueue.forEach(e => e.indicateRemove());
    this.deleteQueue = [];

    this.entities.forEach(e => e.update(dt));
  }

  /*
    TODO: fix this
      - Only target entities that are visible
      - Return from the Set search earlier
  */
  getRandomBaddie() {
    let b = null;

    this.entities.forEach(e => {
      if (e.killable && !e.killable.dead && e.name !== 'user') {
        b = e;
      }
    });

    return b;
  }

  clearFlags() {
    this.entitiesAddedOrRemoved = false;
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

    this.addUser(EntityFactory.create('user'));
    this.add(EntityFactory.create('ui'));

    for (let i = 0; i < 3; ++i) {
      let m1 = EntityFactory.create('mouse');
      // m1.pos.mult(3);
      // let m2 = EntityFactory.create('mouse');
      // m1.pos.set(150, 250);
      // m2.pos.set(130, 250);
      this.add(m1);
      // this.add(m2);
    }

    // this.add(EntityFactory.create('hummingbird'));

    // let e = new EventSystem();
    // e.clear();
  }

  remove(e) {
    for (let i = 0; i < this.deleteQueue.length; i++) {
      if (e === this.deleteQueue[i]) {
        continue;
        // TODO: Entities are being put in this list more than once
      }
    }

    this.deleteQueue.push(e);
    // this.entitiesAddedOrRemoved = true;
  }

  getUser() {
    return this.user;
  }
}