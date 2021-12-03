/* Lines 13-184 were inspired by 
https://github.com/Niranjan-Kumar-Gupta/rain-animated-login-page

Created snow class based on rain class.
Created handleSnow function based on handleRain function, which was originally handleParticle.
Corrected several spelling errors.
Fixed formatting.
Removed redundant variables.
Removed window event listener
Removed main class and created generateCloud, generateRain, and generateSnow based on main class.
Renamed several variables and functions.
*/
class cloud {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * 50 + 10;
    this.size = Math.random() * 100 + 20;
    this.speed = Math.random() * 1 + 0.5;
  }
  update() {
    this.x += this.speed;
    if (this.x > window.innerWidth + 50) {
      this.x = -50;
    }
  }
  draw(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.fillStyle = grid;
    ctx.lineWidth = 0.005;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }
}

class rain {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 20 + 1;
    this.speed = Math.random() * 5 + 2;
    this.size1 = particleSize(this.speed, 1, 5, 1, 20);
  }
  update() {
    this.speed += 0.2;
    this.y += this.speed;
    if (this.y - this.size1 > window.innerHeight) {
      this.y = 0;
      this.speed = Math.random() * 20 + 1;
    }
  }
  draw(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.size1 * 0.8);
    ctx.stroke();
    ctx.closePath();
  }
}

class snow {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = 3;
    this.speed = Math.random() * 5 + 2;
    this.size1 = 3;
  }
  update() {

    this.speed += 0.00001;
    this.y += this.speed;
    if (this.y - this.size1 > window.innerHeight) {
      this.y = 0;
      this.speed = Math.random() * 20 + 1;
    }
  }
  draw(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.size1 * 0.8);
    ctx.stroke();
    ctx.closePath();
  }
}

let rainCanvas;
let cloudCanvas;
let snowCanvas;
let grid;

function generateCloud() {
  $("body").append("<canvas id='cloudCanvas'></canvas>");
  cloudCanvas = initializeCanvas('cloudCanvas');
  setInterval(() => {
    handleCloud();
  }, 1000 / 60);
  grid = cloudCanvas.getContext('2d').createLinearGradient(7, 9, 10, window.innerHeight);
  grid.addColorStop(0, 'rgba(15, 15, 11,0.8)');
  grid.addColorStop(0.2, 'rgba(115, 115, 131,0.7)');
  grid.addColorStop(1, 'rgba(205,205,205,0.2)');
}

function generateRain() {
  $("body").append("<canvas id='rainCanvas'></canvas>");
  rainCanvas = initializeCanvas('rainCanvas');
  setInterval(() => {
    handleRain();
  }, 1000 / 60);
}

function generateSnow() {
  $("body").append("<canvas id='snowCanvas'></canvas>");
  snowCanvas = initializeCanvas('snowCanvas');
  setInterval(() => {
    handleSnow();
  }, 1000 / 40);
}

function initializeCanvas(canvasClass) {
  const canvas = document.getElementById(canvasClass);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}
function clear(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function particleSize(n, x1, y1, x2, y2) {
  let x = n * (y1 - x1) / y1;
  let partSize = x * (y2 - x2) / x2 - y2;
  return partSize;
}

// Lines 147-184 handles weather particles, generates new ones, and stores in array
let cloudParticle = [];
for (let i = 0; i < 120; i++) {
  cloudParticle.push(new cloud());
}

function handleCloud() {
  clear(cloudCanvas);
  for (let i = 0; i < cloudParticle.length; i++) {
    cloudParticle[i].update();
    cloudParticle[i].draw(cloudCanvas);
  }
}

let rainParticle = [];
for (let i = 0; i < 150; i++) {
  rainParticle.push(new rain());
}

function handleRain() {
  clear(rainCanvas);
  for (let i = 0; i < rainParticle.length; i++) {
    rainParticle[i].draw(rainCanvas);
    rainParticle[i].update();
  }
}

let snowParticle = [];
for (let i = 0; i < 150; i++) {
  snowParticle.push(new snow());
}

function handleSnow() {
  clear(snowCanvas);
  for (let i = 0; i < snowParticle.length; i++) {
    snowParticle[i].draw(snowCanvas);
    snowParticle[i].update();
  }
}

// Weather forecast application
function search() {
  let input = $("#locationInput").val();

  // Accesses the OpenWeatherMap API
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=imperial&appid=3c1c7f97dad91531c9dba623495781dc')
    .then(response => response.json())
    .then(data => {
      let icon = data['weather'][0]['icon'];

      changeData($('#location'), data['name']);

      changeData($('#temperature'), data['main']['temp'] + " °F");

      changeData($('#description'), data['weather'][0]['description']);

      $('#icon').attr('src', 'http://openweathermap.org/img/wn/' + icon + '@4x.png');

      // Generates weather animations based on weather description
      if (data['weather'][0]['description'].includes('clouds')) {
        //rainFall();
        $("#rainCanvas").remove();
        $("#snowCanvas").remove();
        $("body").css({"background": "linear-gradient(rgba(0,0,0,1) 5%, rgba(25,25,25,1) 70%, rgba(100,100,100,100) 100%)"});
        $("h6").css({"color": "white"});
        generateCloud();
      }
      else if (data['weather'][0]['description'].includes('rain')) {
        //rainFall();
        $("#cloudCanvas").remove();
        $("#snowCanvas").remove();
        $("body").css({"background": "linear-gradient(rgba(0,0,0,1) 5%, rgba(2,0,36,1) 70%, rgba(0,70,105,100) 100%)"});
        $("h6").css({"color": "white"});
        generateRain();
      }
      else if (data['weather'][0]['description'].includes('snow')) {
        //rainFall();
        $("#cloudCanvas").remove();
        $("#rainCanvas").remove();
        $("body").css({"background": "linear-gradient(rgba(0,0,0,1) 5%, rgba(2,0,36,1) 70%, rgba(255,255,255,1) 100%)"});
        $("h6").css({"color": "black"});
        generateSnow();
      }
      else {
        $("#cloudCanvas").remove();
        $("#rainCanvas").remove();
        $("#snowCanvas").remove();
        $("body").css({"background": "linear-gradient(rgba(0,0,0,1) 5%, rgba(2,0,36,1) 70%, rgba(0,100,150,1) 100%)"});
        $("h6").css({"color": "white"});
      }
    })
};

// Function to alter HTML based on weather data
function changeData(tag, newData) {

  tag.empty();

  tag.append(newData);
}
