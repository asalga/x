'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';

import CollisionType from '../../collision/CollisionType.js';
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

  // provide ID to event
  // when event occurs, get ID compare to

  // let ID = 105;

  // Event should happen once per entity - entity combination
  
  e.on('collision', data => {
    data.other.health.hurt(30);
    scene.remove(e);
  }, e, { onlySelf: true });







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

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz / 2);
    p3.restore();
  }
  e.addComponent(spriteRender);
  e.addComponent(new Collidable(e, { type: CollisionType.PLAYER_BULLET, mask: CollisionType.ENEMY }));
  e.addComponent(new LifetimeLimit(e, { limit: 0.1 }));

  return e;
}