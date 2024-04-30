const playerName = localStorage.getItem("playerName");
if (playerName) window.location.href = "./game/";

const nameForm = document.querySelector(".name-form");
const popupOverlay = document.querySelector(".popup-overlay");
const popup = popupOverlay.querySelector(".popup");
const playerNameSpan = popup.querySelector(".player-name-span");
const yesButton = popup.querySelector(".yes");
const noButton = popup.querySelector(".no");

nameForm.addEventListener("submit", (event) => {
  const playerName = nameForm.querySelector("input").value;
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    } else if (event.key === "Enter") {
      startGame();
    }
  });

  playerNameSpan.focus();
  playerNameSpan.textContent = playerName;
  showPopup();
  noButton.addEventListener("click", closePopup);
  yesButton.addEventListener("click", startGame);
  event.preventDefault();
});

function showPopup() {
  popupOverlay.style.display = "flex";
  setTimeout(() => {
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 50);
    popup.style.transform = "scale(1)";
  }, 125);
}

function closePopup() {
  setTimeout(() => {
    setTimeout(() => {
      popupOverlay.style.display = "none";
    }, 125);
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }, 125);
  setTimeout(() => {
    popup.style.transform = "scale(0)";
  }, 25);
  popup.style.opacity = 0;
}

function startGame() {
  localStorage.setItem("playerName", playerNameSpan.textContent);
  window.location.href = "./game/";
}
