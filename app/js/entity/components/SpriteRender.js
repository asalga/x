'use strict';

import Component from './Component.js';

export default class SpriteRender extends Component {
  constructor(e, cfg) {
    super(e, 'spriterender');
    this.renderable = true;
    this.layer = cfg && cfg.layer || 0;
  }
}