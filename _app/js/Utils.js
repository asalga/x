'use strict';

export default class Utils {
  static getEl(selector) {
    return document.getElementById(selector);
  }
  static noop() {}
}

// }
//   pointInRect(p, r) {
//     if (p.x >= r.x && p.x <= r.x + r.w &&
//       p.y >= r.y && p.y <= r.y + r.h) {
//       return true;
//     }
//     return false;
//   },
//   noop() {}
// };