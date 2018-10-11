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
    // Allow the entities to do any cleanup
    this.deleteQueue.forEach(e => e.indicateRemove());

    this.deleteQueue.forEach(e => {
      this.entities.delete(e);
      // debugger;
      // TODO: change event to remove?
      new Event({ evtName: 'death', data: e }).fire();
    });

    this.deleteQueue = [];

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

    let user = EntityFactory.create('user');
    this.addUser(user);

    for (let i = 0; i < 1; ++i) {
      this.add(EntityFactory.create('mouse'));
    }
    this.add(EntityFactory.create('hummingbird'));

    // let e = new EventSystem();
    // e.clear();
  }

  remove(e) {

    for(let i = 0; i < this.deleteQueue.length; i++){
      if(e === this.deleteQueue[i]){
        debugger;
      }
    }

    this.deleteQueue.push(e);
    this.entitiesAddedOrRemoved = true;
  }

  getUser() {
    return this.user;
  }
}