var canvas;
var stage;
var container;

// Button logic
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainContainer = document.getElementById("mainContainer");
const successMessage = document.getElementById("successMessage");

let yesScale = 1;
let noScale = 1;

// Logic to shrink NO btn and grow YES btn on click
noBtn.addEventListener("click", () => {
    // Shrink NO button
    noScale -= 0.15;
    if (noScale < 0.1) noScale = 0.1; // Don't let it disappear completely
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `scale(${noScale})`;
    
    // Grow YES button
    yesScale += 0.3;
    yesBtn.style.transition = "transform 0.3s ease";
    yesBtn.style.transform = `scale(${yesScale})`;
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    // Fade out the main container
    mainContainer.classList.add("fade-out");
    
    // After fade out, show success message
    setTimeout(() => {
        mainContainer.style.display = "none";
        successMessage.classList.add("show");
    }, 500);
});

function init() {
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  
  resizeCanvas();
  
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', function() {
    setTimeout(resizeCanvas, 100);
  });

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  // Create hearts
  for (var i = 0; i < 30; i++) {
    var heart = new createjs.Shape();
    heart.graphics.beginFill("#ded162");
    heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
    heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
    
    heart._x = Math.random() * w;
    heart.y = Math.random() * h;
    heart.perX = (1 + Math.random() * 2) * h;
    heart.offX = Math.random() * h;
    heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
    heart.velY = -Math.random() * 2 - 1;
    heart.scale = Math.random() * 1 + 0.3;
    heart._rotation = Math.random() * 40 - 20;
    heart.alpha = 1;

    container.addChild(heart);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  for (var i = 0; i < l; i++) {
    var heart = container.getChildAt(i);
    
    if (heart.y < -50) {
      heart._x = Math.random() * w;
      heart.y = h + 50;
      heart.perX = (1 + Math.random() * 2) * h;
      heart.offX = Math.random() * h;
      heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
      heart.velY = -Math.random() * 2 - 1;
      heart.scale = Math.random() * 1 + 0.3;
      heart._rotation = Math.random() * 40 - 20;
    }
    
    var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
    heart.y += heart.velY * heart.scaleX / 2;
    heart.x = heart._x + Math.cos(int) * heart.ampX;
    heart.rotation = heart._rotation + Math.sin(int) * 30;
  }

  stage.update(event);
}

init();