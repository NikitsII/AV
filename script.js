let audio, context, analyser, src, array;
logo = document.getElementById("logo").style;
body = document.querySelector('body');
click = body.querySelector('h1');
play = body.querySelector('h1');
audio = document.getElementById("audio")

function doublePlayMus() {
  playMus()
  playMus()
}

function changeMus() {

  switch (document.getElementById('list').value) {
    case '1': { document.getElementById("audio").src = "1.mp3"; break }
    case '2': { document.getElementById("audio").src = "https://rus.zvukofon.com/dl/101889828/Major_Lazer_DJ_Snake_M_-_Lean_On_(musicport.org).mp3"; break }
    case '3': { document.getElementById("audio").src = "https://rus.zvukofon.com/dl/1171339242/Felix_Jaehn_Jasmine_Thompson_-_Aint_Nobody_Loves_Me_Better_(musicport.org).mp3"; break }
    case '4': { document.getElementById("audio").src = "http://air2.radiorecord.ru:805/rr_320"; break }
    case '5': { document.getElementById("audio").src = "http://air2.radiorecord.ru:805/mix_320"; break }
    case '6': { document.getElementById("audio").src = "https://zaycevfm.cdnvideo.ru/ZaycevFM_pop_256.mp3"; break }
    case '7': { document.getElementById("audio").src = "https://zaycevfm.cdnvideo.ru/ZaycevFM_shanson_256.mp3"; break }
  }
  audio = document.getElementById("audio")
  playMus()
}

function uploadAudio() {
  audio.stop
  document.getElementById("audio").src = document.getElementById('music').value
  audio = document.getElementById("audio")
  playMus()
  dots.length = 2
}

sensitivity = 50

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function playMus() {
  if (!context) {
    preparation();
    document.getElementById("play").style.color = "rgba(0,0,0,0)"
  }

  if (audio.paused) {
    audio.play();
    loop();
    document.getElementById("buttonPlay").textContent = "PAUSE"
    document.getElementById("play").style.color = `rgba(0,0,0,0)`
    document.getElementById("click").style.color = `rgba(0,0,0,0)`
  }
  else {
    audio.pause();
    document.getElementById("buttonPlay").textContent = "PLAY"
    document.getElementById("click").style.color = "#ffffff";
    document.getElementById("play").style.color = '#ffffff'
  }
}

function preparation() {
  context = new (window.AudioContext || window.webkitAudioContext)();

  analyser = context.createAnalyser();
  src = context.createMediaElementSource(audio);
  src.connect(analyser);
  analyser.connect(context.destination);
  loop();
}

function loop() {
  window.requestAnimationFrame(loop);
  array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);
  logo.minHeight = (array[sensitivity]) + "px";
  logo.width = (array[sensitivity] * 1.5) + "px";
  logo.height = (array[sensitivity] * 1.5) + "px";
  r = 260 / (160 / array[sensitivity])
  g = 260 / (160 / array[sensitivity])
  b = 260 / (160 / array[sensitivity])
  r1 = getRandomFloat(array[sensitivity] + 72, array[sensitivity] + 100)
  g1 = getRandomFloat(array[sensitivity] + 30, array[sensitivity] + 50)
  b1 = getRandomFloat(array[sensitivity] + 100, array[sensitivity] + 150)
  r2 = 260 * (160 / array[sensitivity - 20]) * 0.1
  g2 = 260 * (160 / array[sensitivity - 10]) * 0.11
  b2 = 260 * (160 / array[sensitivity]) * 0.11
  r3 = 260 / (160 / array[sensitivity])
  g3 = 260 / (160 / array[sensitivity - 10])
  b3 = 260 / (160 / array[sensitivity - 20])

  config.mouseSize = array[sensitivity] * 0.9
  maxWavesAmplitude = array[sensitivity] * 0.6
  //ringRadiusOffset = array[60] * 0.3
  numberOfWaves = 50
  numberOfRings = 1
  ringRadius = array[40] * 340 / 1000
  config.sphereRad = 250 * (array[40] / 140) + 30
  rgbback = '#1e1e1e'
  if (array[40] < 150) { config.sphereRad = 250 * (array[sensitivity] / 140) + 30 } else {
    config.sphereRad = array[60] * (Math.random() * 2 + 1)
    r3 = getRandomFloat(260 / (160 / array[sensitivity]) * Math.random(), 260 / (160 / array[sensitivity]) * Math.random())
    g3 = getRandomFloat(260 / (160 / array[sensitivity - 10]) * Math.random(), 260 / (160 / array[sensitivity - 10]) * Math.random())
    b3 = getRandomFloat(260 / (160 / array[sensitivity - 20]) * Math.random(), 260 / (160 / array[sensitivity - 20]) * Math.random())
    rgbback = 'rgba(' + r2 + ',' + g2 + ',' + b2 + ',1)'
    //config.massFactor = 0.0006
  }
  if (array[40] < 50) { config.sphereRad = 500 }

  rgba1 = 'rgba(' + r1 + ',' + g1 + ',' + b1 + ',' + array[sensitivity] * 0.001 + ')'
  rgba2 = 'rgba(' + r3 + ',' + g3 + ',' + b3 + ',' + array[sensitivity] * 0.1 + ')'
  rgb = 'rgba(' + r + ',' + g + ',' + b + ',1)'

  rgbdot = rgba2
  currenAngle = array[sensitivity]

  document.getElementById("logo").style.background = rgb
  document.getElementById("body").style.background = rgbback;
  colors = [rgba1, rgba1]
  if (audio.ended) {
    document.getElementById("buttonPlay").textContent = "PLAY"
    document.getElementById("click").style.color = "#ffffff";
    document.getElementById("play").style.color = '#ffffff'
  }
}

//dots/////////////////////////////////////
r = getRandomFloat(150, 200)
g = getRandomFloat(100, 150)
b = getRandomFloat(0, 256)
rgb = 'rgb(' + r + ',' + g + ',' + b + ')'

const config = {
  dotMinRad: 9,
  dotMaxRad: 10,
  sphereRad: 500,
  bigDotRad: 50,
  massFactor: 0.0015,
  defColor: 'rgba(250, 100, 25, 0)',
  smooth: 0.95,

}
rgbdot = `rgba(0,0,0,0)`;

const TWO_PI = 2 * Math.PI;
const canvas = document.querySelector(`canvas#dot`);
const ctx = canvas.getContext(`2d`);

let w, h, mouse, dots;

class Dot {
  constructor(r) {
    this.pos = { x: random(0, canvas.width), y: random(0, canvas.height) }
    this.vel = { x: 0, y: 0 }
    this.rad = r || random(config.dotMinRad, config.dotMaxRad);
    this.mass = this.rad * config.massFactor;
    this.color = config.defColor;
  }
  draw(x, y) {
    this.pos.x = x || this.pos.x + this.vel.x * 1.5;
    this.pos.y = y || this.pos.y + this.vel.y * 1.5
    createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
    createCircle(this.pos.x, this.pos.y, this.rad, true, config.defColor);
  }
}

function updateDots() {
  for (let i = 0; i < dots.length; i++) {
    let acc = { x: 0, y: 0 }
    for (let j = 0; j < dots.length; j++) {
      if (i == j) continue;
      let [a, b] = [dots[i], dots[j]];
      let delta = { x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y }
      let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
      let force = (dist - config.sphereRad) / dist * b.mass;

      if (j == 0) {

        let alpha = config.mouseSize / dist;
        a.color = rgbdot;

        dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass * 2 : force = a.mass * 50;
      }
      acc.x += delta.x * force;
      acc.y += delta.y * force;
    }
    dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
    dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
  }
  dots.map(e => e == dots[0] ? e.draw(mouse.x, mouse.y) : e.draw());
}

let maxDotsLength = 100;
let maxDotsLengthMinus1 = 99;

function changeDotsLength() {
  maxDotsLength = document.getElementById('dotsLength').value
  maxDotsLengthMinus1 = maxDotsLength - 1
}


function createCircle(x, y, rad, fill, color) {
  if (dots.length < maxDotsLength) {
    ctx.fillStyle = ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, TWO_PI);
    ctx.closePath();
    fill ? ctx.fill() : ctx.stroke();
  } else { dots.length = maxDotsLengthMinus1 }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function init() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;

  mouse = { x: w / 2, y: h / 2, down: true }

  dots = [];

  dots.push(new Dot(config.bigDotRad))
}

function loop1() {
  ctx.clearRect(0, 0, w, h);
  if (mouse.down) { dots.push(new Dot()); }
  updateDots();

  window.requestAnimationFrame(loop1);
}

function line(x, y, x2, y2) {
  ctx.lineWidth = 11;
  ctx.strokeStyle = rgb;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
(() => {
  init();
  loop1();
})();
function setPos({ layerX, layerY }) {
  [mouse.x, mouse.y] = [document.documentElement.clientWidth / 2, document.documentElement.clientHeight / 2];
}

function isDown() {
  mouse.down = !mouse.down;
}

const cnv = document.querySelector(`canvas#ring`);
const ctx2 = cnv.getContext(`2d`);

const init2 = () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
}

let numberOfRings = 2;
let ringRadiusOffset = 5;
let maxWavesAmplitude = 60;
let colors = []
let numberOfWaves = 9;
let ringRadius = 10;
let startAngle = 5;
let waveOffset = 10;
//let displacement = 0;
//const waveAmplitude = 2;

(() => {
  init2();
})();

function updateRings() {
  for (let i = 0; i < numberOfRings; i++) {
    let radius = i * ringRadiusOffset + ringRadius;
    let offsetAngle = i * waveOffset * Math.PI / 180
    drawRing(radius, colors[i], offsetAngle);
  };
  startAngle > 360 ? startAngle = 0 : startAngle++
}

let centerX = cnv.width / 2;
let centerY = cnv.height / 2;

const init1 = () => {
  centerX = cnv.width / 2;
  centerY = cnv.height / 2;

}



function drawRing(radius, color, offsetAngle) {
  ctx2.strokeStyle = color;
  ctx2.lineWidth = 4;
  ctx2.beginPath();

  for (let j = 0; j < 360; j++) {
    let currenAngle = (j + startAngle) * Math.PI * 675 / 1000;
    let displacement = 0;
    let now = Math.abs(j);
    //if (now < 5 || now <30 && now >20 || now <50 && now >40 || now <70 && now >60 || now <90 && now >80 || now <110 && now >100 || now <130 && now >120 || now <150 && now >140 || now <170 && now >160 || now >180) { displacement = (now + 100) / 180; }
    if (now < 90) { displacement = (200) / 200 } else { displacement = (200) / 200 }


    let waveAmplitude = radius + displacement * Math.sin((currenAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
    let x = centerX + Math.cos(currenAngle) * (radius + waveAmplitude);
    let y = centerY + Math.sin(currenAngle) * (radius + waveAmplitude);
    j > -180 ? ctx2.lineTo(x, y) : ctx2.moveTo(x, y);
  }
  ctx2.closePath();
  ctx2.stroke();
}

function loop2() {
  //cnv.width |=0;
  ctx2.clearRect(0, 0, cnv.width, cnv.height);
  updateRings();
  requestAnimationFrame(loop2);
}
(() => {
  loop2();
  window.addEventListener('resize', init2)
  window.addEventListener('resize', init1)
})();

