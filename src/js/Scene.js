'use strict';

export default class Scene {
  constructor() {
    this.entities = new Set();
    this.user = null;
  }

  update(dt) {
    this.entities.forEach(e => e.update(dt));
  }

  draw(p3) {
    this.entities.forEach(e => e.draw(p3));
  }

  addUser(u){
  	this.user = u;
  	this.entities.add(u);
  }

  getUser(){
  	return this.user;
  }

}