// 🔒 Bellagio Water One — Core Logic

let frame = 1;
let alignmentScore = {
  launch: 0,
  insertion: 0,
  landing: 0
};

// DOM
const sceneImage = document.getElementById("sceneImage");
const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const continueBtn = document.getElementById("continueBtn");
const meterArea = document.getElementById("meterArea");
const needle = document.getElementById("needle");
const targetZone = document.getElementById("targetZone");
const actionBtn = document.getElementById("actionBtn");

// 🔒 Meter State
let meterRunning = false;
let needlePos = 0;
let direction = 1;
let meterInterval = null;

// 🔒 Frame Setup
function setFrame(f) {
  frame = f;

  // reset UI
  choices.innerHTML = "";
  meterArea.style.display = "none";
  continueBtn.style.display = "none";

  switch (frame) {

    // 🔹 Q1
    case 1:
      sceneImage.src = "scene1.jpg";
      dialogue.innerText = "I have landed at your planet’s positive pole. Where will you search?";
      addChoice("North Pole", false, polarWrong);
      addChoice("South Pole", true, polarRight);
      break;

    // 🔹 Q2
    case 2:
      sceneImage.src = "scene2.jpg";
      dialogue.innerText = "Which falls faster in equal conditions?";
      addChoice("Hammer", false, hammerWrong);
      addChoice("Feather", true, featherRight);
      break;

    // 🔹 Q3
    case 3:
      sceneImage.src = "scene3.jpg";
      dialogue.innerText = "You push five gallons of water away from you. What happens?";
      addChoice("You stay still", false, stayStillWrong);
      addChoice("You follow it", false, followWrong);
      addChoice("You move backward", true, backwardRight);
      break;

    // 🔹 Launch
    case 4:
      sceneImage.src = "scene3.jpg";
      dialogue.innerText = "Align and launch.";
      startMeter("launch");
      break;

    // 🔹 Insertion
    case 5:
      sceneImage.src = "scene3.jpg";
      dialogue.innerText = "Align your trajectory. Enter the window.";
      startMeter("insertion");
      break;

    // 🔹 Landing
    case 6:
      sceneImage.src = "scene3.jpg";
      dialogue.innerText = "Control descent. Reduce velocity.";
      startMeter("landing");
      break;

    // 🔹 Result
    case 7:
      sceneImage.src = "scene3.jpg";
      showResults();
      break;
  }
}

// 🔒 Choices
function addChoice(text, isCorrect, handler) {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.onclick = handler;
  choices.appendChild(btn);
}

// 🔒 Q1 Feedback
function polarWrong() {
  dialogue.innerText = "You chose the North Pole. Your compass points here because it is drawn to a magnetic opposite. Reconsider.";
}
function polarRight() {
  dialogue.innerText = "You questioned the label. You chose correctly.";
  showContinue();
}

// 🔒 Q2 Feedback
function hammerWrong() {
  dialogue.innerText = "You chose the hammer. You are measuring weight. In equal conditions, mass does not determine fall rate. Reconsider.";
}
function featherRight() {
  dialogue.innerText = "You chose correctly. In the absence of resistance, all masses fall equally.";
  showContinue();
}

// 🔒 Q3 Feedback
function stayStillWrong() {
  dialogue.innerText = "You chose no motion. Force creates movement in both directions. Reconsider.";
}
function followWrong() {
  dialogue.innerText = "You chose forward motion. Motion separates you from the object. Reconsider.";
}
function backwardRight() {
  dialogue.innerText = "You understand reaction mass. You are ready.";
  showContinue();
}

// 🔒 Continue
function showContinue() {
  continueBtn.style.display = "block";
}

continueBtn.onclick = () => setFrame(frame + 1);

// 🔒 Meter Logic
function startMeter(type) {
  meterArea.style.display = "flex";
  meterRunning = true;
  needlePos = 0;
  direction = 1;

  meterInterval = setInterval(() => {
    needlePos += direction * 4;

    if (needlePos >= 490 || needlePos <= 0) {
      direction *= -1;
    }

    needle.style.left = needlePos + "px";
  }, 16);

  actionBtn.onclick = () => stopMeter(type);
}

function stopMeter(type) {
  clearInterval(meterInterval);
  meterRunning = false;

  const targetLeft = targetZone.offsetLeft;
  const targetRight = targetLeft + targetZone.offsetWidth;

  let result;

  if (needlePos >= targetLeft && needlePos <= targetRight) {
    result = "optimal";
    alignmentScore[type] = 2;
  } else if (
    needlePos >= targetLeft - 50 &&
    needlePos <= targetRight + 50
  ) {
    result = "acceptable";
    alignmentScore[type] = 1;
  } else {
    result = "misaligned";
    alignmentScore[type] = 0;
  }

  dialogue.innerText = `Result: ${result}`;
  showContinue();
}

// 🔒 Final Results
function showResults() {
  const total =
    alignmentScore.launch +
    alignmentScore.insertion +
    alignmentScore.landing;

  if (total >= 5) {
    dialogue.innerText = "Water delivered. Earth stabilizing.";
  } else if (total >= 3) {
    dialogue.innerText = "Delivery achieved with deviation.";
  } else {
    dialogue.innerText = "Delivery incomplete. Reattempt required.";
  }
}

// 🔒 Start
setFrame(1);
