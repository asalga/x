'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import Collidable from '../components/Collidable.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

import Minigun from '../components/Minigun.js';

import Vec2 from '../../math/Vec2.js';

import Debug from '../../debug/Debug.js';

import EntityFactory from '../EntityFactory.js';

export default function createUser() {
  let user = new Entity();
  user.name = 'user';
  user.pos.set(p3.width / 2, p3.height / 2);
  user.size = 40;
  user.bounds = new BoundingCircle(user.pos, user.size);

  user.renderProxy = function(p3) {
    p3.stroke(111, 150, 80);
    let h = (this.health.health) / 100;
    p3.fill(157 * h, 192 * h, 188 * h);
    p3.ellipse(p3.width / 2, p3.height / 2, user.size, user.size);

    let center = new Vec2(this.pos.x, this.pos.y);
    let cursor = new Vec2(p3.mouseX, p3.mouseY);

    cursor.sub(center);
    cursor.normalize();
    cursor.mult(60);
    cursor.add(center);

    // debug
    if (debug) {
      p3.strokeWeight(1);
      p3.stroke(0, 255, 0);
      p3.line(center.x, center.y, p3.mouseX, p3.mouseY);
    }

    p3.save();
    p3.strokeWeight(10);
    p3.stroke(145, 119, 130);
    p3.line(center.x, center.y, cursor.x, cursor.y);
    p3.restore();

    p3.save();
    p3.noStroke();
    p3.fill(48, 60, 93);
    p3.ellipse(center.x, center.y, 20, 20);
    p3.restore();
  };

  let minigun = new Minigun();
  user.addComponent(minigun);


  user.on('GAME_CLICK', function(){
    let h = EntityFactory.create('homingmissle');
    h.pos.set(0, 400);
    h.seektarget.target = scene.bee;
    scene.add(h);
  }, user);


  let health = new Health(user, 100);
  health.regenerationSpeed = 10;
  health.updateProxy = function() {
    Debug.add(`Player Health: ${Math.floor(health.health)}`);
  };
  user.addComponent(health);

  let killable = new Killable(user);
  killable.onDeath = function() {
    // scene.restartGame(); 
  };
  user.addComponent(killable);

  let coll = new Collidable(user);
  coll.type = CollisionType.PLAYER;
  coll.mask = CollisionType.ENEMY_BULLET | CollisionType.ENEMY;
  user.addComponent(coll);

  return user;
}