'use strict';

import Component from './Component.js';
import Vec2 from '../../math/Vec2.js';

let _v = new Vec2();

export default class MouseLauncherController extends Component {
  constructor(e) {
    super(e, 'mouselaunchercontroller');
  }

  getLauncherDirection() {
    let userPos = scene.getUser().getWorldCoords();
    _v.set(p3.mouseX, p3.mouseY);
    Vec2.subSelf(_v, userPos);
    return _v.normalize();
  }

  update(dt) {
    let dir = this.getLauncherDirection();
    this.entity.launcher.direction.set(dir);
  }

  draw() {}
}

// - make controller generic
// let m = MouseLauncherController();
// this.entity.launcher.setController(m);
// this.entity.launcher.setController(null);
// this.entity.launcher.setController(RandomTargetingController);

// let f = FiringRate();
 // - Rate() / expressed from 0.1
 // - Conservative
 // - Overheating
// Launcher.setFiringRate(f)