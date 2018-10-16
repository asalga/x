'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Targetable extends Component {
  constructor(e, cfg) {
    super(e, 'targetable');
    let defaults = {};
    this.trackers = [];
    Utils.applyProps(this, defaults, cfg);
  }

  loseTrackers() {}

  gainTrackers() {}

  update(dt) {}
}