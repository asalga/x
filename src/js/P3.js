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
      that.mouseX = Math.floor(e.clientX - rect.left);
      that.mouseY = Math.floor(Math.abs(e.clientY - rect.bottom));
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

  fill(col) {
    this._doFill = true;
    this.ctx.fillStyle = col;
  }

  stroke(args) {
    this._doStroke = true;

    if(typeof col === 'string'){
      this.ctx.strokeStyle = args;
    }
    else if(arguments.length === 3){
      let c = [...arguments];
      this.ctx.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }

  strokeWeight(n) {
    this.ctx.lineWidth = n;
  }

  noStroke() {
    this._doStroke = false;
  }

  rect(x, y, w, h) {

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