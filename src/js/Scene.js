'use strict';

import EntityFactory from './entity/EntityFactory.js';
import EventSystem from './event/EventSystem.js';
import Event from './event/Event.js';
import Spawner from './entity/actors/Spawner.js';
import Vec2 from './math/Vec2.js';
import bk from './entity/actors/background.js';
import cfg from './cfg.js';

export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;

    this.entitiesAddedOrRemovedDirty = false;
    this.deleteQueue = [];
    this.eventsToFireNextFrame = [];

    // move this out of scene
    this.tempSpawnTimer = 4;
  }

  update(dt) {

    this.tempSpawnTimer += dt;
    if (this.tempSpawnTimer > 5.0) {
      this.tempSpawnTimer = 0;

      let circularWave = EntityFactory.create('circularwave');
      let lineWaveLeft = EntityFactory.create('linewave');
      let lineWaveRight = EntityFactory.create('linewave');
      // circularWave.addComponent(new LifetimeLimit(1))

      circularWave.setup({
        entity: 'mouse',
        count: 3,
        distance: 300
      });

      lineWaveLeft.setup({
        entity: 'mouse',
        count: 2,
        dir: -1,
        pos: new Vec2(0, 0),
        spacing: 250
      });
      lineWaveLeft.launch();

      lineWaveRight.setup({
        entity: 'mouse',
        count: 2,
        dir: 1,
        pos: new Vec2(cfg.gameWidth, 0),
        spacing: 250
      });
      lineWaveRight.launch();

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
        new Event({ evtName: 'death', data: e}).fire();
        
        // The seekTarget relies on this event and tries to get a new 
        // target. but if the entity is still alive, it may return
        // a target that will be removed next frame.
        let rm = new Event({ evtName: 'remove', data: e });
        this.eventsToFireNextFrame.push(rm);
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
        // debugger;
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
    this.add(EntityFactory.create('background'));
    this.add(EntityFactory.create('ui'));
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