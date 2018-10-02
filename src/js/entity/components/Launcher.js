'use strict';

/*
  Responsible for launching bullets at a certain rate.
*/

import Component from './Component.js';
import Vec2 from '../../math/Vec2.js';

export default class Launcher extends Component {
  constructor(e, cfg) {
    super(e, 'launcher');

    this.enabled = true;
    this.rate = 1 / cfg.rate;
    this.ammo = cfg.ammo;
    this.autoFire = cfg.autoFire;
    this.firing = false;
    this.timer = 0;

    this.color = cfg.color;
    this.direction = new Vec2(1,0);

    this.on('GAME_MOUSE_DOWN', function() { this.firing = true; }, this);
    this.on('GAME_MOUSE_UP', function() { this.firing = false; }, this);

    // this.getVecToCursor = function() {
    //   let center = window.UserPos;
    //   // let center = new Vec2(p3.width / 2, p3.height / 2.);
    //   let cur = new Vec2(p3.mouseX, p3.mouseY);
    //   cur = Vec2.sub(cur, center);
    //   return cur.normalize().mult(60);
    // }
  }

  setEnable(b) {
    this.enabled = b;
  }

  requestFire() {
    this.firing = true;

    if (this.ammo <= 0) { return; }
    if (this.enabled === false) { return; }

    if (this.timer > this.rate) {
      let diff = this.timer % this.rate;
      this.timer = 0;
      this.fire();
    }
  }

  fire() {
    this.ammo--;
    let bullet = this.createFunc();

    // Debug.add(`${this.entity.name} ammo: ${this.ammo}`);

    // let gunTip = this.getVecToCursor();
    // gunTip.add(p3.width / 2, p3.height / 2);
    // bullet.pos.set(gunTip);
    // let dir = gunTip.sub(UserPos).normalize();
    // bullet.setDir(dir);

    let worldCoords = this.entity.getWorldCoords();
    let gunTip = this.direction.clone().mult(50);
    worldCoords.add(gunTip);
    bullet.pos.set(worldCoords);

    bullet.setDir(this.direction);
  }

  update(dt) {
    this.updateProxy && this.updateProxy(dt);

    this.timer += dt;
    if (this.firing || this.autoFire) {
      this.requestFire();
    }
  }

  /*
   */
  stopFiring() {
    this.firing = false;
  }

  // draw() {
  //   Debug.add(`${this.entity.name} ammo: ${this.ammo}`);

  //   p3.save();
  //   let curr = this.getVecToCursor();
  //   p3.strokeWeight(10);
  //   p3.stroke(this.color);
  //   p3.line(0, 0, curr.x, curr.y);

  //   p3.restore();

  //   if (debug) {
  //     p3.save();
  //     p3.strokeWeight(2);
  //     p3.stroke(120, 255, 0);
  //     p3.line(0, 0, p3.mouseX - p3.width / 2, p3.mouseY - p3.height / 2);
  //     p3.restore();
  //   }
  // }
}