'use strict';

import Component from './Component.js';
import Vec2 from '../../math/Vec2.js';

export default class MouseLauncherController extends Component {
  constructor(e) {
    super(e, 'mouselaunchercontroller');
  }

  getLauncherDirection() {
    let userPos = scene.getUser().getWorldCoords();
    let cursor = new Vec2(p3.mouseX, p3.mouseY);
    let posToCursor = Vec2.sub(cursor, userPos);
    return posToCursor.normalize();
  }

  update(dt) {
    let dir = this.getLauncherDirection();
    this.entity.launcher.direction.set(dir);
  }

  draw() {}
}