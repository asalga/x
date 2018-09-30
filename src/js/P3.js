export default class P3 {
  constructor(cvs, ctx) {
    this.ctx = ctx;
    this.cvs = cvs;

    this.width = cvs.width;
    this.height = cvs.height;

    // defaults
    this.fill('blue');
    this.stroke('white');
    this.strokeWeight(1);
    this._doFill = true;
    this._doStroke = true;
    this._clearCol = 'black';
    this.ctx.font = 'normal 600 14px Courier New';

    this.mouseX = 0;
    this.mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      let rect = e.target.getBoundingClientRect();
      this.mouseX = Math.floor(e.clientX - this.cvs.offsetLeft);
      this.mouseY = Math.floor(e.clientY - this.cvs.offsetTop);
    });
  }

  get TAU() {
    return Math.PI * 2;
  }

  clearColor(col) {
    this._clearCol = this._argColorToString(...arguments);
    // this._clearCol = col;
  }

  clear() {
    this.ctx.save();
    this.ctx.fillStyle = this._clearCol;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.restore();
  }

  noFill() {
    this._doFill = false;
  }

  _argColorToString(args) {
    let ret;
    if (arguments.length === 1) {
      if (typeof(args) === 'string') {
        // this.ctx.fillStyle = args;
        ret = args;
      } else if (typeof(args) === 'number') {
        let c = args;
        ret = `rgb(${c}, ${c}, ${c})`;
      }
    } else {
      let c = [...arguments];
      ret = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
    return ret;
  }

  fill() {
    this._doFill = true;
    this.ctx.fillStyle = this._argColorToString(...arguments);
  }

  text(txt, x, y) {
    if (this._doFill) {
      this.ctx.fillText(txt, x, y);
    }
    if (this._doStroke) {
      this.ctx.strokeText(txt, x, y);
    }
  }

  stroke() {
    this._doStroke = true;
    this.ctx.strokeStyle = this._argColorToString(...arguments);
  }

  strokeWeight(n) {
    this.ctx.lineWidth = n;
  }
  save() {
    this.ctx.save();
  }
  restore() {
    this.ctx.restore();
  }
  noStroke() {
    this._doStroke = false;
  }

  rect(x, y, w, h) {
    // let arrArgs = [...arguments];
    if (this._doStroke) {
      this.ctx.strokeRect(x, y, w, h);
    }
    if (this._doFill) {
      this.ctx.fillRect(x, y, w, h);
    }
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  rotate(a) {
    this.ctx.rotate(a);
  }

  translate(x, y) {
    this.ctx.translate(x, y);
  }

  ellipse(x, y, r1, r2) {
    if (this._doStroke) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r1, 0, 2 * Math.PI, false);
      this.ctx.stroke();
    }

    if (this._doFill) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r1, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }
  }

  arc(x, y, r, s, e) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, s, e, false);
    this.ctx.stroke();
  }

  sin(a) {
    return Math.sin(a);
  }
  cos(a) {
    return Math.cos(a);
  }
}