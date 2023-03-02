// const { running } = require("animejs");

history.scrollRestoration = "manual";

const element = document.getElementById("introText_1");
element.addEventListener("animationend", listener, false);

//#region Intro Stuff
const track = document.getElementById("def-track");
const image_track = document.getElementById("image-track");

function listener(event) {
    setTimeout(() => { 
        element.style.animationPlayState = "paused";
        continueWithIntro_1(); 
    }, 800)
}

function continueWithIntro_1() {
    document.body.style.animationPlayState = "running";
    track.style.animationPlayState = "running";
    image_track.style.animationPlayState = "running";
    window.scrollTo({ top: 1000, behavior: "smooth" });
}
//#endregion

//#region Card Stuff
document.getElementById("def-track").onmousemove = e => {
    for(const card of document.getElementsByClassName("def")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }
//#endregion

track.addEventListener("animationend", waiter, false);

var canMoveTrack = false;
var hasPressed = false;

function waiter(event) {
  setTimeout(() => {
    if (!canMoveTrack) {
      document.getElementById("arrowImg").style.animation = "fadeIn 1500ms forwards";
      canMoveTrack = true;
    }
  }, 6000);
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "ArrowLeft":
      if (canMoveTrack) goToNextLeft();
      break;
    case "ArrowRight":
      if (!hasPressed) document.getElementById("arrowImg").style.animation = "fadeOut 2000ms forwards";
      if (canMoveTrack) goToNextRight();
      hasPressed = true;
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);

const defs = document.getElementsByClassName("def");
const images = document.getElementsByClassName("image");
console.log(defs.length);

let count = 0;
let countImgs = images.length - 1;
sizeAnimSpeed = 300;

for (let i = 0; i < defs.length; i++) {
  if (i != count) {
    defs[i].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
    document.getElementById(`title${i}`).animate(
      {opacity: 0},
      {duration: 10, fill: "forwards"}
    );
    document.getElementById(`para${i}`).animate(
      {opacity: 0},
      {duration: 10, fill: "forwards"}
    );
  }
  if (i != countImgs) images[i].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
}

function goToNextRight() {
  if (count != defs.length - 1) {
    document.getElementById(`title${count}`).animate(
      {opacity: 0},
      {duration: 50, fill: "forwards"}
    );
    document.getElementById(`para${count}`).animate(
      {opacity: 0},
      {duration: 50, fill: "forwards"}
    );

    defs[count].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
    images[countImgs].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
    
    count++;
    countImgs--;

    document.getElementById(`title${count}`).animate(
      {opacity: 1},
      {duration: 200, fill: "forwards"}
    );
    document.getElementById(`para${count}`).animate(
      {opacity: 1},
      {duration: 200, fill: "forwards"}
    );

    defs[count].style.animation = `goBigDef ${sizeAnimSpeed}ms forwards`;
    images[countImgs].style.animation = `goBigDef ${sizeAnimSpeed}ms forwards`;

    let goTo = 0;
    count < 12 ?
      goTo = parseFloat(track.dataset.movePercentage) - 4.4 + count*.01 : 
      goTo = parseFloat(track.dataset.movePercentage) - 4.4;
    track.dataset.movePercentage = `${goTo}`;
    track.animate(
      {transform: `translate(${goTo}%, 0%)`},
      {duration: 200, fill: "forwards"}
    );

    countImgs < 12 ?
      goTo = parseFloat(image_track.dataset.movePercentage) + 4.4 - countImgs*.01 : 
      goTo = parseFloat(image_track.dataset.movePercentage) + 4.4;
    image_track.dataset.movePercentage = `${goTo}`;
    image_track.animate(
      {transform: `translate(${goTo}%, 0%)`},
      {duration: 200, fill: "forwards"}
    );
  }
}

function goToNextLeft() {
  if (count != 0) {
    document.getElementById(`title${count}`).animate(
      {opacity: 0},
      {duration: 50, fill: "forwards"}
    );
    document.getElementById(`para${count}`).animate(
      {opacity: 0},
      {duration: 50, fill: "forwards"}
    );
    
    defs[count].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
    images[countImgs].style.animation = `goSmallContainer ${sizeAnimSpeed}ms forwards`;
    
    count--;
    countImgs++;

    document.getElementById(`title${count}`).animate(
      {opacity: 1},
      {duration: 200, fill: "forwards"}
    );
    document.getElementById(`para${count}`).animate(
      {opacity: 1},
      {duration: 200, fill: "forwards"}
    );

    defs[count].style.animation = `goBigDef ${sizeAnimSpeed}ms forwards`;
    images[countImgs].style.animation = `goBigDef ${sizeAnimSpeed}ms forwards`;

    let goTo = 0;
    count < 12 ?
      goTo = parseFloat(track.dataset.movePercentage) + 4.4 - count*.01 : 
      goTo = parseFloat(track.dataset.movePercentage) + 4.4;
    track.dataset.movePercentage = `${goTo}`;
    track.animate(
      {transform: `translate(${goTo}%, 0%)`},
      {duration: 200, fill: "forwards"}
    );
    
    countImgs < 12 ?
      goTo = parseFloat(image_track.dataset.movePercentage) - 4.4 + countImgs*.01 : 
      goTo = parseFloat(image_track.dataset.movePercentage) - 4.4;
    image_track.dataset.movePercentage = `${goTo}`;
    image_track.animate(
      {transform: `translate(${goTo}%, 0%)`},
      {duration: 200, fill: "forwards"}
    );
  }
}