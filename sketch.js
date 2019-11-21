let red;
let n_slider;
let pointers_list = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  red = color(255, 0, 0, 100);
  n_slider = createSlider(2, 20, 3);
  n_slider.position(0, 0);
  n_slider.mouseReleased(redo);

  let pointercount = 0;
  for (var i = 1; i < 6; i+=2) {
    for (var j = 1; j < 6; j+=2) {
      pointers_list.push(new Pointers(width/2 * j/6, height * i/6, width/(2 * 10), n_slider.value(), pointercount * 1/8));
      pointercount++;
    }
  }
}

function draw() {
  background(200);

  draw_igraph(width * 3/4, height/2, width/2 - 20, height - 20, 2);

  textSize(20);
  text("N = " + str(n_slider.value()),10, 40)

  for (var i = 0; i < pointers_list.length; i++) {
    pointers_list[i].update();
    pointers_list[i].show();
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    text("Δs = " + str(i * 1/8) + "λ", pointers_list[i].x, pointers_list[i].y + pointers_list[i].radius * 1.5);
    pop();
  }
}

function redo() {
  pointers_list = []
  let pointercount = 0;
  for (var i = 1; i < 6; i+=2) {
    for (var j = 1; j < 6; j+=2) {
      pointers_list.push(new Pointers(width/2 * j/6, height * i/6, width/(2 * 10), n_slider.value(), pointercount * 1/8));
      pointercount++;
    }
  }
}

function draw_igraph(x, y, g_width, g_height, periods) {
  push();
  noFill();
  translate(x, y)
  scale(1, -1);
  beginShape();
  for (var i = 0; i < g_width; i++) {
    let x_pos = i - g_width/2;
    let y_pos = map(get_intensity(n_slider.value(), (i * periods)/g_width), 0, n_slider.value(), 10, g_height - 10) - g_height/2;
    vertex(x_pos, y_pos);
  }
  endShape();
  stroke(red);
  for (var j = 1; j <= periods - 1; j++) {
    line(g_width * j/periods - g_width/2, g_height/2, g_width * j/periods - g_width/2, -g_height/2);
  }
  pop();
}

function draw_pointers(x, y, radius, pointers, delta_s) {
  ang = map(delta_s, 0, 1, 0, PI*2);
  push();
  translate(x, y);
  scale(1, -1);
  for (var i = 0; i < pointers; i++) {
    x = radius * cos(i * ang);
    y = radius * sin(i * ang);
    arrow(0, 0, x, y, red);
  }
  pop();
}

function get_intensity(pointers, delta_s, amp=1) {
  let all_x = 0;
  let all_y = 0;
  ang = map(delta_s, 0, 1, 0, PI*2);

  for (var i = 0; i < pointers; i++) {
    all_x += amp * cos(i * ang);
    all_y += amp * sin(i * ang);
  }

  let intensity = sqrt(all_x * all_x + all_y * all_y);
  return intensity;
}

function get_result_arrow(pointers, delta_s, amp=1) {
  let all_x = 0;
  let all_y = 0;
  ang = map(delta_s, 0, 1, 0, PI*2);

  for (var i = 0; i < pointers; i++) {
    all_x += amp * cos(i * ang);
    all_y += amp * sin(i * ang);
  }

  return [all_x, all_y];
}
