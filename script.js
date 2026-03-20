let currentScene = 1;

const sceneImage = document.getElementById("sceneImage");
const actionBtn = document.getElementById("actionBtn");
const continueBtn = document.getElementById("continueBtn");

actionBtn.addEventListener("click", () => {
  alert("Locked In");
});

continueBtn.addEventListener("click", () => {
  currentScene++;

  if (currentScene > 3) {
    currentScene = 1;
  }

  sceneImage.src = "scene" + currentScene + ".png";
});

