'use strict';

export default class Killable {
  constructor() {
    this.dead = false;
    this.deadTime = 0;
  }
  update(dt, entity) {
    if (this.dead) {
      this.deadTime += dt;
    }
  }
  kill() {
    this.dead = true;
    this.hasDied();
  }
}