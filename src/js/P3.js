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

    this.mouseX;
    this.mouseY;
    let that = this;

    document.addEventListener('mousemove', function(e) {
      let rect = e.target.getBoundingClientRect();
      that.mouseX = Math.floor(e.clientX - cvs.offsetLeft);
      that.mouseY = Math.floor(e.clientY - cvs.offsetTop);
    });
  }

  clearColor(col) {
    this._clearCol = col;
  }

  clear() {
    this.ctx.save();
    this.ctx.fillStyle = this._clearCol;
    this.ctx.clearRect(0, 0, cvs.width, cvs.height);
    this.ctx.fillRect(0, 0, cvs.width, cvs.height);
    this.ctx.restore();
  }

  noFill() {
    this._doFill = false;
  }

  fill(args) {
    this._doFill = true;
    if (arguments.length === 1) {
      if (typeof(args) === 'string') {
        this.ctx.fillStyle = args;
      } else if (typeof(args) === 'number') {
        let c = args;
        this.ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
      }
    } else {
      let c = [...arguments];
      this.ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }

  stroke(args) {
    this._doStroke = true;
    if (arguments.length === 1) {
      if (typeof(args) === 'string') {
        this.ctx.strokeStyle = args;
      } else if (typeof(args) === 'number') {
        let c = args;
        this.ctx.strokeStyle = `rgb(${c}, ${c}, ${c})`;
      }
    } else {
      let c = [...arguments];
      this.ctx.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
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

  ellipse(x, y, r1, r2) {
    if (this._doStroke) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r1, 0, 2 * Math.PI, false);
      this.ctx.stroke();
    }

    if (this._doFill) {
      this.ctx.fill();
    }
  }

  sin(a) {
    return Math.sin(a);
  }
  cos(a) {
    return Math.cos(a);
  }
}