'use strict';

import Component from './Component.js';
import EntityFactory from '../EntityFactory.js';
import Vec2 from '../../math/Vec2.js';

export default class Minigun extends Component {
  constructor(e) {
    super(e, 'minigun');
    this.fireRate = 5;

    this.on('GAME_CLICK', function(e) {
      let bullet = EntityFactory.create('bullet');
      let center = new Vec2(p3.width/2, p3.height/2);
      let cursor = new Vec2(p3.mouseX, p3.mouseY);

      if(e.button == 2){
        bullet.size = 3;
        bullet.health.health = 2;
      }

      cursor.sub(center);
      let gunTip = cursor.clone();
      gunTip.normalize();
      gunTip.mult(60);
      bullet.pos.add(gunTip);

      cursor.normalize();
      cursor.mult(400);

      bullet.vel.set(cursor.x, cursor.y);
      scene.add(bullet);
    }, this);
  }

  update(dt) {
  }
}