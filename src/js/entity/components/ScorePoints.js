'use strict';

import Component from './Component.js';

import Utils from '../../Utils.js';
import Event from '../../event/Event.js';

export default class ScorePoints extends Component {
  constructor(e, cfg) {
    super(e, 'scorepoints');
    Utils.applyProps(this, { points: 1 }, cfg);

    this.increaseScore = function() {
      console.log('increasescore: ', this.id);

      let evt = new Event({
        evtName: 'increasescore',
        data: { points: this.scorepoints.points }
      });
      evt.fire();
    };

    e.on('death', this.increaseScore, e, { onlySelf: true });
  }
}