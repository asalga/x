'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import Collidable from '../components/Collidable.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CollisionType from '../../collision/CollisionType.js';

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
    p3.fill(0,this.health.health, 0);
    // debugger;
    p3.ellipse(p3.width / 2, p3.height / 2, user.size, user.size);

    let center = new Vec2(this.pos.x, this.pos.y);
    let cursor = new Vec2(p3.mouseX, p3.mouseY);

    cursor.sub(center);
    cursor.normalize();
    cursor.mult(60);
    cursor.add(center);

    // if (debug) {
    //   p3.strokeWeight(1);
    //   p3.stroke(0, 255, 0);
    //   p3.line(center.x, center.y, p3.mouseX, p3.mouseY);
    // }

    p3.save();
    p3.strokeWeight(3);
    p3.stroke(255, 0, 0);

    p3.line(center.x, center.y, cursor.x, cursor.y);
    p3.restore();
  };


  user.on('GAME_CLICK', function(e){
    let bullet = EntityFactory.create('bullet');
    bullet.pos.set(p3.width/2, p3.height/2);

    let center = new Vec2(this.pos.x, this.pos.y);
    let cursor = new Vec2(p3.mouseX, p3.mouseY);

    cursor.sub(center);
    cursor.normalize();
    cursor.mult(400);

    bullet.vel.set(cursor.x, cursor.y);
    scene.add(bullet);
  }, user);

  let health = new Health(user, 100);
  health.regenerationSpeed = 10;
  health.updateProxy = function(){
    Debug.add(`Player Health: ${Math.floor(health.health)}`);
  };
  user.addComponent(health);

  let killable = new Killable(user);
  killable.onDeath = function() {
    // scene.restartGame(); 
  };
  user.addComponent(killable);

  // let coll = new Collidable(user);
  let coll = new Collidable(user);
  coll.type = CollisionType.PLAYER;
  coll.mask = CollisionType.ENEMY_BULLET | CollisionType.ENEMY;
  user.addComponent(coll);

  return user;
}