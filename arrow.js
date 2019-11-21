function arrow(x1, y1, x2, y2, c) {
  v = createVector(x2 - x1, y2 - y1);
  angle = atan((v.y)/(v.x));
  if (v.x > 0 && v.y > 0) {
    rot = angle + PI/2;
  } else if (v.x < 0 && v.y > 0) {
    rot = 3*PI/2 + angle;
  } else if (v.x < 0 && v.y < 0) {
    rot = 3*PI/2 + angle;
  } else {
    rot = angle + PI/2;
  }
  push();
  fill(c);
  stroke(c);
  line(x1, y1, x2, y2);
  translate(x2, y2);
  rotate(rot);
  triangle(-6, 0, 0, -10, 6, 0);
  pop();
}

class Shifting_arrow {
  constructor(x, y, radius, dest) {
    this.x = x;
    this.y = y;
    this.x2 = x + radius;
    this.y2 = y;
    this.ang = 0;
    this.dest = dest;
    this.radius = radius;
    this.show_result = false;
  }

  update() {
    if ((this.ang < this.dest) && (((this.dest-this.ang)/this.dest) > 0.001)) {
      this.ang += 0.2 * ((this.dest-this.ang)/this.dest) + 0.003;
      this.x2 = this.radius * cos(this.ang) + this.x;
      this.y2 = this.radius * sin(this.ang) + this.y;
    } else {
      this.show_result = true;
    }
  }

  show() {
    arrow(this.x, this.y, this.x2, this.y2, red);
  }
}

class Pointers {
  constructor(x, y, radius, pointers, delta_s) {
    this.angle = map(delta_s, 0, 1, 0, PI*2);
    this.pointerlist = []
    for (var i = 0; i < pointers; i++) {
      this.pointerlist.push(new Shifting_arrow(x, y, radius, this.angle * i));
    }
    this.show_result = false;
    this.result = get_result_arrow(pointers, delta_s, radius);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update() {
    this.show_result = true;
    for (var j = 0; j < this.pointerlist.length; j++) {
      this.pointerlist[j].update();
      if (this.pointerlist[j].show_result == false) {
        this.show_result = false;
      }
    }
  }

  show() {
    for (var j = 0; j < this.pointerlist.length; j++) {
      this.pointerlist[j].show();
    }
    if (this.show_result) {
      arrow(this.x, this.y, this.x + this.result[0], this.y + this.result[1], color(0, 255, 0));
      //console.log(this.x, this.y, this.result[0], this.result[1]);
    }
  }
}
