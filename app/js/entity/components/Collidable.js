'use strict';

import Component from './Component.js';

export default class Collidable extends Component {
  constructor(e, cfg) {
    super(e, 'collidable');

    this.enabled = true;
    this.type = (cfg && cfg.type) || 0x0;
    this.mask = (cfg && cfg.mask) || 0x0;
  }
}