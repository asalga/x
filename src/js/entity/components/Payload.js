'use strict';

import Component from './Component.js';
import LingerHurt from './LingerHurt.js';

import EntityFactory from '../EntityFactory.js';
import Utils from '../../Utils.js';
import Event from '../../event/Event.js';

export default class Payload extends Component {

  constructor(e, cfg) {
    super(e, 'payload');
    this.cfg = cfg;
    this.reset();
  }

  reset() {
    console.log('payload reset');

    let defaults = {
      dmg: 1,
      lingerTime: 0
    };
    Utils.applyProps(this, defaults, this.cfg);

    this.hit = function(data) {
      let other = data.other;

      // (new Event({ evtName: 'payload' })).fire();
      // let test = new Event({ evtName: 'payloaddelivered', data: this.entity });
      // debugger;
      //.fire();

      // let psys = EntityFactory.create('particlesystem');
      // scene.add(psys);

      // psys.add(new Emitter(psys {
      //   ageRange: [1, 2],
      //   sizeRange: [1, 4],
      //   spriteRenderer
      // }));

      // psys.add(new Emitter(psys, {
      //   ageRange: [2,3],
      //   sizeRnage: [3,4]
      // }))

      if (!other.health) { return; }

      // other.health.hurt(this.payload.dmg);
      let lingerHurt = new LingerHurt(other, {
        dmg: this.payload.dmg,
        lingerTime: this.payload.lingerTime
      });
      other.addComponent(lingerHurt);
      
      scene.remove(this);
    };
 
    this.entity.on('collision', this.hit, this.entity, { onlySelf: true });
  }
}