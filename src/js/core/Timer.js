'use strict'

export default class Timer {
  constructor() {
    this.time = 0;
  }

  update(dt) {
    this.time += dt;
  }

  getTime(){
  	return this.time;
  }
}