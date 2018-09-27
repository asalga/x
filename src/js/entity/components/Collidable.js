'use strict';

import Component from './Component.js';

export default class Collidable extends Component {
  constructor(e) {
    super(e, 'collidable');
    this.type = 0x0;
    this.mask = 0x0;
  }
}