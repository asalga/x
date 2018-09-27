'use strict';

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
    })

    this.entities.forEach(e => e.update(dt)); 
  }

  clearFlags(){
  	this.entitiesAddedOrRemoved = false;
  }

  draw(p3) {
    this.entities.forEach(e => e.draw(p3));
  }

  addUser(u){
  	this.user = u;
  	this.entities.add(u);
  	this.entitiesAddedOrRemoved = true;
  }

  add(e){
  	this.entities.add(e);
  	this.entitiesAddedOrRemoved = true;
  }

  remove(e){
    this.deleteQueue.push(e);
  }

  getUser(){
  	return this.user;
  }

}