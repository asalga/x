'use strict';

import Component from './Component.js';

export default class WeaponSwitcher extends Component {
  constructor(e) {
    super(e, 'weaponswitcher');
    this.weapons = new Map();

    document.addEventListener('keydown', e => {
      this.turnAllWeaponsOff();

      let w = this.weapons.get(e.key);
      w && this.enableWeapon(w, true);
    });
  }

  enableWeapon(e, b) {
    e.visible = b;
    e.setEvents(b);
  }

  init() {
    this.turnAllWeaponsOff();
    this.enableWeapon(this.weapons.get('1'), true);
  }

  turnAllWeaponsOff() {
    this.weapons.forEach(e => this.enableWeapon(e, false));
  }

  addWeapon(key, entity) {
    this.weapons.set(key, entity)
  }

  update(dt) {}
  draw() {}
}