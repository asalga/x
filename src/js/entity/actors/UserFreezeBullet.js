'use strict';

import Entity from '../Entity.js';

import Collidable from '../components/Collidable.js';
import Payload from '../components/Payload.js';
import SpriteRender from '../components/SpriteRender.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import EntityFactory from '../../entity/EntityFactory.js';

export default function createFreezeBullet() {
  let e = new Entity({ name: 'freezebullet', layer: 2 });
  e.bounds = new BoundingCircle(e.pos, 20);

  scene.add(e);

  // COMPONENTS
  let spriteRender = new SpriteRender(e, { width: 32, height: 32, layer: 20 });
  spriteRender.draw = function() {
    let sz = e.bounds.radius;

    this.p3.clearAll();
    this.p3.save();
    this.p3.stroke(255);
    this.p3.noStroke();
    this.p3.strokeWeight(3);

    this.p3.fill('rgba(200, 200, 200, .2)');
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.rect(-sz, -sz, sz, sz);
    this.p3.restore();

    p3.save();
    p3.translate(e.pos.x - (sz / 2), e.pos.y - (sz / 2));
    p3.drawImage(this.sprite, -sz, -sz / 2);
    p3.restore();
  }
  e.addComponent(spriteRender);

  e.on('collision', data => {
    let [e1, e2] = [data.e1, data.e2];
    // Check if one of the entities passed is us
    if (e1 !== e && e2 !== e) { return; }
    let other = e1 === e ? e2 : e1;

    // if other already has a crystal
    if(other.hasChild('crystal')){
      return;
    }

    let crystal = EntityFactory.create('crystal');
    crystal.setTarget(other);
    other.add(crystal);

    scene.remove(e);
  }, e);

  // TODO: fix
  // Need to include this just so that the bullet gets
  // removed.
  // let payload = new Payload(e, { dmg: 10, lingerTime: 10 });
  // e.addComponent(payload);

  // Remove this?
  let coll = new Collidable(e);
  coll.type = CollisionType.PLAYER_BULLET;
  coll.mask = CollisionType.ENEMY;
  e.addComponent(coll);

  return e;
}