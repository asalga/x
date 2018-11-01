'use strict';

/*
  Responsible for launching bullets at a certain rate.

  When fire() is called, it may or may not actually fire a bullet.
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
import Pool from '../../core/Pool.js';

let _worldCoords = Vec2.create();
let _vel = Vec2.create();
let _gunTip = Vec2.create();

export default class Launcher extends Component {
  constructor(e, cfg) {
    super(e, 'launcher');

    let v = Vec2.create();
    v.set(1, 0);

    let defaults = {
      ammo: 1,
      enabled: true,
      shotsPerSecond: 1,
      autoFire: false,
      bulletVel: 500,
      direction: v,
      bulletName: 'bullet'
    };
    Utils.applyProps(this, defaults, cfg);

    this.firing = false;
    this.timer = 0;
    this.rate = 1 / this.shotsPerSecond;

    this.on('GAME_MOUSE_DOWN', () => { this.firing = true; }, this);
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

      _worldCoords.zero();
      this.entity.getWorldCoords(_worldCoords);

      _gunTip.set(this.direction).mult(60);
      _worldCoords.add(_gunTip);

      // let bullet = this.createFunc({ pos: _worldCoords });
      let bullet = Pool.get(this.bulletName);
      if (bullet) {
        bullet.pos.set(_worldCoords);
        scene.add(bullet);

        _vel.set(this.direction).mult(this.bulletVel);
        bullet.vel.set(_vel);

        // TODO: find better way for this?
        bullet.postlaunch && bullet.postlaunch.launched(this);
      }


    };
  }

  getTip(v){
    v.zero();
    this.entity.getWorldCoords(v);
    v.set(this.direction).mult(60);
    // _worldCoords.add(_gunTip);
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