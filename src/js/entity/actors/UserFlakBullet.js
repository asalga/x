'use strict';

import Entity from '../Entity.js';

import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import DistanceCountdown from '../components/DistanceCountdown.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import EntityFactory from '../../entity/EntityFactory.js';

export default function createFlakBullet(cfg) {
  let e = new Entity({ name: 'flakbullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 5);
  e.pos.set(cfg.pos.x, cfg.pos.y);

  scene.add(e);

  e.updateProxy = function(dt) {
    this.rot = this.distancecountdown.travelled() / 15;
  }

  let spriteSz = 32;
  let spriteRender = new SpriteRender(e, { width: spriteSz, height: spriteSz, layer: 20 });

  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    // this.p3.clear();
    this.p3.save();
    this.p3.strokeWeight(2);
    this.p3.stroke('yellow');
    this.p3.fill('rgb(0, 0, 0)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rotate(e.rot);
    this.p3.rect(-sz, -sz / 2, sz * 2, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, 0,0);// e.pos.x, e.pos.y);
  }

  // spriteRender.composite = function(){}

  e.addComponent(spriteRender);
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));

  let detonate = function() {
    let v = e.getWorldCoords();

    let explosion = EntityFactory.create('explosion');
    explosion.pos.set(v);

    scene.add(explosion);
    scene.remove(e);
  };

  e.on('collision', data => {
    detonate();
  }, e, { onlySelf: true });

  e.addComponent(new DistanceCountdown(e, {
    distance: 110,
    startPos: e.pos.clone(),
    arrived: detonate
  }));

  return e;
}