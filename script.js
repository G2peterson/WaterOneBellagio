const sceneImage = document.getElementById("sceneImage");
const speakerText = document.getElementById("speakerText");
const questionText = document.getElementById("questionText");
const feedbackText = document.getElementById("feedbackText");

const answersDiv = document.getElementById("answers");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");

const meterArea = document.getElementById("meterArea");
const meterLabel = document.getElementById("meterLabel");
const targetZone = document.getElementById("targetZone");
const needle = document.getElementById("needle");
const lockBtn = document.getElementById("lockBtn");

const continueBtn = document.getElementById("continueBtn");

let stepIndex = 0;
let answered = false;
let meterRunning = false;
let meterInterval = null;
let needlePos = 0;
let direction = 1;
let currentSkillKey = "";

const skillScores = {
  launch: 0,
  insertion: 0,
  landing: 0
};

const steps = [
  {
    type: "question",
    image: "scene1.png",
    speaker: "Orion",
    question: "I have landed at your planet's positive pole. Where will you search?",
    answers: [
      {
        text: "North Pole",
        correct: false,
        feedback:
          "You chose the North Pole. Your compass points there because it is drawn toward a magnetic opposite. Reconsider your orientation."
      },
      {
        text: "South Pole",
        correct: true,
        feedback:
          "You questioned the label. You chose correctly."
      }
    ]
  },
  {
    type: "question",
    image: "scene2.png",
    speaker: "Orion",
    question: "In a vacuum, which falls faster?",
    answers: [
      {
        text: "Feather",
        correct: false,
        feedback:
          "You chose the feather alone. In a vacuum, neither is faster. Reconsider."
      },
      {
        text: "Hammer",
        correct: false,
        feedback:
          "You chose the hammer alone. In a vacuum, neither is faster. Reconsider."
      },
      {
        text: "They fall at the same rate",
        correct: true,
        feedback:
          "Correct. Without air resistance, both fall at the same rate."
      }
    ]
  },
  {
    type: "question",
    image: "scene3.png",
    speaker: "Orion",
    question: "You are in free space holding five gallons of sealed water. You push it away from you. What happens next?",
    answers: [
      {
        text: "You move backward",
        correct: true,
        feedback:
          "You understand reaction mass. The water moves away. You move in equal opposition."
      },
      {
        text: "Nothing happens",
        correct: false,
        feedback:
          "You chose no motion. Force creates movement in both directions. Reconsider."
      },
      {
        text: "You follow the water",
        correct: false,
        feedback:
          "You chose forward motion. Motion separates you from the object. Reconsider."
      }
    ]
  },
  {
    type: "skill",
    image: "scene3.png",
    speaker: "Orion",
    label: "Launch Alignment",
    prompt: "Launch window open. Align and commit.",
    skillKey: "launch"
  },
  {
    type: "skill",
    image: "scene3.png",
    speaker: "Voss",
    label: "Orbital Insertion",
    prompt: "Water is critical. I am going now. Align your insertion.",
    skillKey: "insertion"
  },
  {
    type: "skill",
    image: "scene3.png",
    speaker: "Orion",
    label: "Landing Control",
    prompt: "Arrival is not completion. Control descent.",
    skillKey: "landing"
  },
  {
    type: "result",
    image: "scene3.png",
    speaker: "Orion"
  }
];

function hideAll() {
  answersDiv.classList.add("hidden");
  meterArea.classList.add("hidden");
  feedbackText.textContent = "";
  continueBtn.disabled = true;

  answer1.classList.add("hidden");
  answer2.classList.add("hidden");
  answer3.classList.add("hidden");
}

function renderStep() {
  const step = steps[stepIndex];
  hideAll();
  answered = false;

  sceneImage.src = step.image;
  speakerText.textContent = step.speaker || "";
  questionText.textContent = "";

  if (step.type === "question") {
    renderQuestion(step);
  } else if (step.type === "skill") {
    renderSkill(step);
  } else if (step.type === "result") {
    renderResult();
  }
}

function renderQuestion(step) {
  answersDiv.classList.remove("hidden");
  questionText.textContent = step.question;

  const buttons = [answer1, answer2, answer3];

  buttons.forEach((btn, index) => {
    const answer = step.answers[index];

    if (answer) {
      btn.classList.remove("hidden");
      btn.textContent = answer.text;
      btn.disabled = false;
      btn.onclick = () => handleAnswer(answer);
    } else {
      btn.classList.add("hidden");
    }
  });
}

function handleAnswer(answer) {
  if (answered) return;

  feedbackText.textContent = answer.feedback;

  if (answer.correct) {
    answered = true;
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
}

function renderSkill(step) {
  meterArea.classList.remove("hidden");
  questionText.textContent = step.prompt;
  meterLabel.textContent = step.label;
  currentSkillKey = step.skillKey;
  continueBtn.disabled = true;
  startMeter();
}

function startMeter() {
  clearInterval(meterInterval);
  meterRunning = true;
  needlePos = 0;
  direction = 1;
  needle.style.left = "0px";

  meterInterval = setInterval(() => {
    needlePos += direction * 5;

    const maxPos = 550;

    if (needlePos >= maxPos || needlePos <= 0) {
      direction *= -1;
    }

    needle.style.left = `${needlePos}px`;
  }, 16);
}

lockBtn.onclick = () => {
  if (!meterRunning) return;

  clearInterval(meterInterval);
  meterRunning = false;

  const targetLeft = targetZone.offsetLeft;
  const targetRight = targetLeft + targetZone.offsetWidth;

  if (needlePos >= targetLeft && needlePos <= targetRight) {
    skillScores[currentSkillKey] = 2;
    feedbackText.textContent = "Optimal alignment.";
  } else if (
    needlePos >= targetLeft - 50 &&
    needlePos <= targetRight + 50
  ) {
    skillScores[currentSkillKey] = 1;
    feedbackText.textContent = "Acceptable alignment.";
  } else {
    skillScores[currentSkillKey] = 0;
    feedbackText.textContent = "Misalignment detected.";
  }

  continueBtn.disabled = false;
};

function renderResult() {
  const total =
    skillScores.launch +
    skillScores.insertion +
    skillScores.landing;

  if (total >= 5) {
    questionText.textContent = "Water delivered. Earth stabilizing.";
    feedbackText.textContent = "Status: SUCCESS";
  } else if (total >= 3) {
    questionText.textContent = "Delivery achieved with deviation.";
    feedbackText.textContent = "Status: PARTIAL SUCCESS";
  } else {
    questionText.textContent = "Delivery incomplete. Reattempt required.";
    feedbackText.textContent = "Status: REATTEMPT";
  }

  continueBtn.disabled = false;
}

continueBtn.onclick = () => {
  if (stepIndex < steps.length - 1) {
    stepIndex += 1;
  } else {
    stepIndex = 0;
    skillScores.launch = 0;
    skillScores.insertion = 0;
    skillScores.landing = 0;
  }

  renderStep();
};

renderStep();

