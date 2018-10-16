'use strict';

import EntityFactory from './entity/EntityFactory.js';
import EventSystem from './event/EventSystem.js';
import Event from './event/Event.js';
import Spawner from './entity/actors/Spawner.js';
import Vec2 from './math/Vec2.js';


export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;
    this.timer = 1.5;

    this.entitiesAddedOrRemovedDirty = false;
    this.deleteQueue = [];
  }

  update(dt) {



    this.timer += dt;
    if (this.timer > 100.0) {
      this.timer = 0;

      let circularWave = EntityFactory.create('circularwave');
      circularWave.setup({
        entity: 'mouse',
        distance: 300
      });
      circularWave.launch();
    }


    

    // Seems like this is the best place for this flag to be turned on.
    if (this.deleteQueue.length > 0) {
      this.entitiesAddedOrRemovedDirty = true;
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
      if (e.killable &&
        !e.killable.dead &&
        e.targetable &&
        e.name !== 'user') {
        b = e;
      }
    });

    return b;
  }

  /*
    Make this generic, we'll need to use it in other contexts
  */
  getClosestBaddie(v) {
    let ls = [];
    this.entities.forEach(e => {
      if (e.killable && !e.killable.dead && e.targetable && e.name !== 'user') {
        ls.push(e);
      }
    });

    if (ls.length === 0) { return null; }

    let len = Infinity;
    let closest = ls[0];

    ls.forEach(l => {
      let d = Vec2.sub(l.pos, v).length();

      if (d <= len) {
        closest = l;
        len = d;
      }
    });

    return closest;
  }

  clearFlags() {
    this.entitiesAddedOrRemovedDirty = false;
  }

  addUser(u) {
    this.user = u;
    this.entities.add(u);
    this.entitiesAddedOrRemovedDirty = true;
  }

  add(e) {
    this.entities.add(e);
    this.entitiesAddedOrRemovedDirty = true;
    new Event({ evtName: 'entityadded', data: e }).fire();
  }

  restartGame() {
    this.entities.clear();
    this.deleteQueue = [];

    this.addUser(EntityFactory.create('user'));
    this.add(EntityFactory.create('ui'));

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
    // this.entitiesAddedOrRemovedDirty = true;
  }

  getUser() {
    return this.user;
  }
}