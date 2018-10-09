'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';

import CType from '../../collision/CollisionType.js';
import BoundingCircle from '../../collision/BoundingCircle.js';

export default function createExplosion() {
  let e = new Entity({ name: 'explosion', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 5);
  scene.add(e);

  // let timer = new Timer();
  // timer.start();
  // e.update = function(dt){
  //   timer.update(dt);
  // }

  // e.once('collision', )
  // e.listenTo('collision')

  // let ID = 105;
  // event name
  // entity
  // other

  // e.on('collisionenter', data => {
  //   debugger;
  // }, e, { onlySelf: true, });

  // console.log(e.id);

  e.on('collision', data => {
    data.other.health.hurt(30);
    // data.other.health.hurtOnce(e, 30);
    scene.remove(e);
  }, e, {
    onlySelf: true,
    once: true
    // hash: createHash()
  });








  let spriteRender = new SpriteRender(e, { width: 150, height: 150, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.stroke(120, 0, 0);
    this.p3.strokeWeight(2);
    this.p3.fill('rgb(120, 0, 0, 0.1)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.ellipse(0, 0, sz, sz);
    this.p3.restore();

    p3.drawImage(this.sprite, e.pos.x, e.pos.y);
  }
  e.addComponent(spriteRender);
  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));
  e.addComponent(new LifetimeLimit(e, { limit: 0.2 }));

  return e;
}