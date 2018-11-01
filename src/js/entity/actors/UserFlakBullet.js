'use strict';

import Entity from '../Entity.js';

import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import PostLaunch from '../components/PostLaunch.js';
import DistanceCountdown from '../components/DistanceCountdown.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import EntityFactory from '../../entity/EntityFactory.js';
import Vec2 from '../../math/Vec2.js';

let _temp = Vec2.create();
let _gunTip = Vec2.create();
let yellow = 'yellow';

export default function createFlakBullet(cfg) {
  let e = new Entity({ name: 'flakbullet', layer: 2 });

  e.bounds = new BoundingCircle(e.pos, 5);

  // e.pos.set(cfg.pos.x, cfg.pos.y);

  e.updateProxy = function(dt) {
    // TODO: fix literal
    // this.rot = this.distancecountdown.travelled() / 15;
  };

  let spriteRender = new SpriteRender(e, { layerName: 'bullet' });
  spriteRender.draw = function(_p3) {
    let sz = e.bounds.radius;
    _p3.save();
    _p3.strokeWeight(2);
    _p3.stroke(yellow);
    _p3.fill(0);
    _p3.translate(e.pos.x, e.pos.y);
    _p3.rotate(e.rot);
    _p3.rect(-sz, -sz / 2, sz * 2, sz);
    _p3.restore();
    // p3.drawImage(this.sprite, 0, 0); // e.pos.x, e.pos.y);
  };

  e.addComponent(spriteRender);
  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));

  let detonate = function() {
    debugger;
    // let explosion = EntityFactory.create('explosion');
    // _temp.zero();
    // e.getWorldCoords(_temp);
    // explosion.pos.set(_temp);

    // scene.add(explosion);
    // scene.remove(e);
  };

  e.addComponent(new PostLaunch(e, {
    launched: function(launcher){
      launcher.getTip(_gunTip);
      e.pos.set(_gunTip);

      // debugger;
      // console.log('test');
    }.bind(this)
  }));

  e.resetProxy = function() {
    e.on('collision', data => {
      detonate();
    }, e, { onlySelf: true });
  }

  // e.addComponent(new DistanceCountdown(e, {
  //   distance: 110,
  //   startPos: e.pos.clone(),
  //   arrived: detonate
  // }));

  return e;
}