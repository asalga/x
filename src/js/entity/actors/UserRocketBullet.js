'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Payload from '../components/Payload.js';
import Collidable from '../components/Collidable.js';
import SeekTarget from '../components/SeekTarget.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import NearDeathIndicator from '../components/NearDeathIndicator.js';
import PostLaunch from '../components/PostLaunch.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

import Vec2 from '../../math/Vec2.js';

let ORANGE = 'rgb(245, 25, 25)';
let BLUE = 'rgb(25, 255, 255)';

export default function createUserRocketBullet() {
  let e = new Entity({ name: 'homingmissle' });
  scene.add(e);

  e.bounds = new BoundingCircle(e.pos, 10);

  // If our target has died, get a new one
  e.on('remove', function(data) {
    if (data === e.seektarget.target) {
      e.seektarget.target = scene.getRandomBaddie(e.pos);
    }
  }, e);

  // e.on('death', function(data) {
  // let explosion = EntityFactory.create('explosion');
  // explosion.pos.set(data.pos);
  // scene.add(explosion);
  // }, e, { onlySelf: true, onlyOnce: data => [data.id] });

  // COMPONENTS

  let spriteRender = new SpriteRender(e, { layerName: 'bullet' });
  spriteRender.draw = function(_p3) {
    let sz = e.bounds.radius;
    _p3.save();
    _p3.stroke(0);
    _p3.strokeWeight(2);

    if (e.seektarget.target) {
      _p3.fill(ORANGE);
    } else {
      _p3.fill(BLUE);
    }

    // _p3.translate(_p3.width / 2, _p3.height / 2);
    _p3.translate(e.pos.x, e.pos.y);
    _p3.rotate(Math.atan2(e.vel.y, e.vel.x));
    _p3.rect(-sz, -sz / 2, sz * 2, sz);
    _p3.restore();
  };
  e.addComponent(spriteRender);
  e.addComponent(new Killable(e));

  // e.addComponent(new NearDeathIndicator(e));
  e.addComponent(new Payload(e, { dmg: 5, lingerTime: 1 }));
  e.addComponent(new LifetimeLimit(e, { limit: 2 }));

  e.addComponent(new SeekTarget(e, { maxVel: 200, maxSpeed: 300, maxSteerForce: 10 }));
  e.addComponent(new Collidable(e, { type: CType.PLAYER_BULLET, mask: CType.ENEMY }));

  // TODO: is this the best place for this?
  // e.postlaunch = function() {
  //   // let r = Math.random();
  //   // if (r < 0.5) {
  //     // this.seektarget.target = scene.getRandomBaddie();
  //   // } else {
  //      this.seektarget.target = scene.getClosestBaddie(this.pos);
  //      console.log(this.seektarget);
  //   // }
  // };


  e.addComponent(new PostLaunch(e, {
    launched: function(launcher) {
       e.seektarget.target = scene.getRandomBaddie(e.pos);
       

       if(e.seektarget.target){
        // debugger;
       }
       console.log(e.seektarget.target);

    }.bind(this)
  }));



  let emitter = EntityFactory.create('emitter');
  let div = 6;
  emitter.setup({
    // count: 40,
    // rate: 10,
    // ageRange: [4.0, 4.],
    // sizeRange: [2.5, 2.5],
    // opacityRange: [.7, .7]

    count: 100,
    rate: 30,
    ageRange: [1.7, 2.0],
    sizeRange: [1.5, 2.5],
    opacityRange: [0.7, 1.0],
    velocityRange: [new Vec2(-div, -div), new Vec2(div, div)]
  });
  emitter.virtualParent = e;
  scene.add(emitter);

  return e;
}