'use strict';

import Component from './Component.js';

export default class Payload extends Component {
  constructor(e, payload) {
    super(e, 'payload');
    this.payload = payload;

    e.on('collision', function hit(data) {
      // let [_this, other] = Utils.getWhich(data);
      // if(_this === null){return;}

      // Check if one of the entities passed is us
      let [e1, e2] = [data.e1, data.e2];
      if (e1 !== e && e2 !== e) { return; }
      let other = e1 === e ? e2 : e1;

      if (other.health) {
        other.health.hurt(this.payload);
      }
      scene.remove(e);
    }, this);
  }
}