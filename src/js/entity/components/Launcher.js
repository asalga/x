'use strict';

/*
  Responsible for launching bullets at a certain rate.

  When fire is called, it may or may not actually fire a bullet.
  The success depends on
    - ammo remaining
    - rate at which the launcher can fire
    - if the launcher is on or not.

  We can set the autoFire to true and at the same time, the launcher can
  be off. This allows us to easily switch between continuously firing, then
  pausing (Works well for cloaked entities)
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
    this.rate = 1 / this.shotsPerSecond;

    this.on('GAME_MOUSE_DOWN', () => { this.firing = true }, this);
    this.on('GAME_MOUSE_UP', () => { this.firing = false; }, this);

    // this.getVecToCursor = function() {
    //   let center = window.UserPos;
    //   // let center = new Vec2(p3.width / 2, p3.height / 2.);
    //   let cur = new Vec2(p3.mouseX, p3.mouseY);
    //   cur = Vec2.sub(cur, center);
    //   return cur.normalize().mult(60);
    // }

    this.createBullet = function() {
      this.ammo--;

      let worldCoords = this.entity.getWorldCoords();
      let gunTip = this.direction.clone().mult(60);
      worldCoords.add(gunTip);

      let bullet = this.createFunc({ pos: worldCoords });
      bullet.pos.set(worldCoords);
      bullet.vel.set(this.direction.clone().mult(this.bulletVel));

      // TODO: find better way for this?
      bullet.postLaunch && bullet.postLaunch();
    }
    // let gunTip = this.getVecToCursor();
    // gunTip.add(p3.width / 2, p3.height / 2);
    // bullet.pos.set(gunTip);
    // let dir = gunTip.sub(UserPos).normalize();
  }

  setEnable(b) {
    this.enabled = b;
  }

  /*
    
  */
  fire() {
    this.firing = true;

    if (this.ammo <= 0) { return; }
    if (this.enabled === false) { return; }

    // TODO: fix
    if (this.timer > this.rate) {
      // let diff = this.timer % this.rate;
      this.timer = 0;
      this.createBullet();
    }
  }

  update(dt) {
    this.updateProxy && this.updateProxy(dt);

    this.timer += dt;

    if (!this.enabled) { return; }

    if (this.firing || this.autoFire) {
      // this.requestFire();
      this.fire();
    }
  }
}