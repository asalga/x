'use strict';

/*
  Responsible for launching bullets at a certain rate.
*/

import Component from './Component.js';
import Vec2 from '../../math/Vec2.js';
import Utils from '../../Utils.js';

export default class Launcher extends Component {
  constructor(e, cfg) {
    super(e, 'launcher');
    let defaults = {
      ammo: 1,
      enabled: true,
      shotsPerSecond: 1,
      autoFire: false,
      bulletVel: 500,
      direction: new Vec2(1, 0)
    };
    Utils.applyProps(this, defaults, cfg);

    this.firing = false;
    this.timer = 0;
    // Specify rate as number
    this.rate = 1 / this.shotsPerSecond;



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

    bullet.vel.set(this.direction.clone().mult(this.bulletVel));
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
}