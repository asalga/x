'use strict';

export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;

    // dirty flag
    this.entitiesAddedOrRemoved = false;
  }

  update(dt) {
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

  getUser(){
  	return this.user;
  }

}