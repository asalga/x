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
    this.timer = 9.5;

    this.entitiesAddedOrRemovedDirty = false;
    this.deleteQueue = [];
    this.eventsToFireNextFrame = [];
  }

  update(dt) {

    this.timer += dt;
    if (this.timer > 8.0) {
      this.timer = 0;

      // let circularWave = EntityFactory.create('circularwave');
      // circularWave.setup({
      //   entity: 'mouse',
      //   distance: 300
      // });
      // circularWave.launch();
    }

    // We can't fire events while we are iterating of the 
    // objects being removed, it breaks everything.
    this.eventsToFireNextFrame.forEach(e => e.fire());
    this.eventsToFireNextFrame.length = 0;

    // Seems like this is the best place for this flag to be turned on.
    if (this.deleteQueue.length > 0) {
      this.entitiesAddedOrRemovedDirty = true;

      // let the children do any cleanup.
      this.deleteQueue.forEach(e => {
        let evt = new Event({ evtName: 'remove', data: e });
        evt.fire();
      });

      this.deleteQueue.forEach(e => {
        this.entities.delete(e);
      });

      // Allow the entities to do any cleanup
      this.deleteQueue.forEach(e => e.indicateRemove());
      this.deleteQueue.length = 0;
    }

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
    console.log('remove() ', e.id, e.name);
    if (e.name === 'emitter') {
      debugger;
    }
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