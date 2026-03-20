let scene = 0;

const scenes = [
  {
    image: "scene1.png",
    question: "Where is the positive pole of Earth?",
    answers: ["North Pole", "South Pole"],
    correct: 1,
    explanation: "Earth’s geographic North is actually magnetic south, because opposite poles attract."
  },
  {
    image: "scene2.png",
    question: "In vacuum, what falls faster?",
    answers: ["Feather", "Hammer"],
    correct: 0,
    explanation: "They fall at the same rate in vacuum, no air resistance."
  },
  {
    image: "scene3.png",
    question: "You push 5 gallons of water in space, what happens?",
    answers: ["You move backward", "Nothing happens"],
    correct: 0,
    explanation: "Newton’s third law, pushing mass moves you opposite."
  }
];

const img = document.getElementById("sceneImage");
const question = document.getElementById("questionText");
const a1 = document.getElementById("answer1");
const a2 = document.getElementById("answer2");
const feedback = document.getElementById("feedbackText");
const cont = document.getElementById("continueBtn");

let answered = false;

function loadScene() {
  const s = scenes[scene];

  img.src = s.image;
  question.textContent = s.question;
  a1.textContent = s.answers[0];
  a2.textContent = s.answers[1];
  feedback.textContent = "";
  answered = false;
}

a1.onclick = () => checkAnswer(0);
a2.onclick = () => checkAnswer(1);

function checkAnswer(choice) {
  if (answered) return;

  const s = scenes[scene];

  if (choice === s.correct) {
    feedback.textContent = "Correct";
  } else {
    feedback.textContent = "Wrong: " + s.explanation;
  }

  answered = true;
}

cont.onclick = () => {
  if (!answered) return;

  scene++;
  if (scene >= scenes.length) {
    scene = 0;
  }

  loadScene();
};

loadScene();
