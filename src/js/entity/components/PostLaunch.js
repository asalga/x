'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

/*
	After a bullet has been launched, the bullet may require
	to do extra processing/calculations.
*/
export default class PostLaunch extends Component {
  constructor(e, cfg) {
    super(e, 'postlaunch');
    this.cfg = cfg;
  }

  reset() {
    let defaults = {
      launched: Utils.noop()
    };
    Utils.applyProps(this, defaults, this.cfg);
  }
}