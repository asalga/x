'use strict';

import Entity from '../Entity.js';

import GoToTarget from '../components/GoToTarget.js';
import Health from '../components/Health.js';
import Killable from '../components/Killable.js';
import Collidable from '../components/Collidable.js';
import Minigun from '../components/Minigun.js';

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

  function getVecToCursor(center, cursor) {
    let cur = cursor.clone();
    cur.sub(center);
    cur.normalize();
    cur.mult(60);
    cur.add(center);
    return cur;
  }

  user.renderProxy = function(p3) {
    p3.stroke(111, 150, 80);
    let h = (this.health.health) / 100;
    p3.fill(157 * h, 192 * h, 188 * h);
    p3.ellipse(p3.width / 2, p3.height / 2, user.size, user.size);

    let center = new Vec2(this.pos.x, this.pos.y);
    let cursor = new Vec2(p3.mouseX, p3.mouseY);
    let curr = getVecToCursor(center, cursor);

    if (debug) {
      p3.strokeWeight(1);
      p3.stroke(0, 255, 0);
      p3.line(center.x, center.y, p3.mouseX, p3.mouseY);
    }

    p3.save();
    p3.strokeWeight(10);
    p3.stroke(145, 119, 130);
    p3.line(center.x, center.y, curr.x, curr.y);
    p3.restore();

    p3.save();
    p3.noStroke();
    p3.fill(48, 60, 93);
    p3.ellipse(center.x, center.y, 20, 20);
    p3.restore();
  };

  /*


    
    
    ___Minigun.js
    default export function createUserMiniGun(){
      let e = new Entity();
      e.name = 'minigun'
      e.pos = new Vec2();

      let lc = new LauncherComponent(e);
      lc.fireRate = 10;
      lc.autoFire = false;
      lc.bulletCreation = EntityFactory.create('minigun_bullet', {speed: 10, damage:10});
      e.addComponent(lc);
    }

    ----------

    createEnemyMiniGun(){
      let e = new Entity();
      e.name = 'minigun'
      e.pos = new Vec2();

      let lc = new AutoLauncher(e):
      lc.bulletCreation = EntityFactory.create('enemy_minigun', {})
      e.addComponent(lc);
    }

    mouse.add(EntityFactory.create('enemy_minigun'));
    minigun.range = 100;
    minigun.

    ----------
    let minigun = EntityFactory.create('minigun');
    minigun.autoFire = false;
    
    user.addGun(minigun);
    ----------

    Gun
    - launcher component
    - bullet function
    

    - AutoLauncher
    - Launcher

    autoLauncher.bulletCreation();

  */


  // let gun = new EntityFactory('user_minigun');
  // user.add(gun);



  // let gun = new EntitFactory('mouse_minigun');
  // mouse.add(gun);


  let minigun = new Minigun();
  user.addComponent(minigun);


  // Temporary hack to test missles
  user.on('GAME_CLICK', function(e) {
    if (e.button === 2) {
      let h = EntityFactory.create('homingmissle');
      h.pos.set(user.pos);
      h.seektarget.target = scene.bee;
      scene.add(h);
    }
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