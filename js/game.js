let playerName = localStorage.getItem("playerName");
if (!playerName) window.location.href = "../";

// Display Player Name
const playerNameSpan = document.querySelector(".player-name-span");
playerNameSpan.textContent = playerName;

// Options
const header = document.querySelector("header");
const optionsWrapper = document.querySelector(".options-wrapper");
const options = document.querySelector(".options");
const menuButton = document.querySelector(".hamburger-menu-button");
menuButton.addEventListener("click", toggleMenu);

// Change Name
const popupOverlay = document.querySelector(".popup-overlay");
const popup = popupOverlay.querySelector(".popup");
const changeNameButton = document.querySelector(".change-name-button");
const changeNameForm = document.querySelector(".change-name");
const newNameInput = changeNameForm.querySelector("input");
const noButton = popup.querySelector(".no");
const resetProgressButton = document.querySelector(".restart-progress-button");

changeNameButton.addEventListener("click", showPopup);
newNameInput.value = playerName;

changeNameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  changeName();
});

resetProgressButton.addEventListener("click", restartProgress);

noButton.addEventListener("click", (event) => {
  event.preventDefault();
  closePopup();
  showToast("Name change cancelled", "fail");
  setTimeout(() => {
    newNameInput.value = playerName;
  }, 125);
});

// Functions
function restartProgress() {
  localStorage.removeItem("playerName");
  window.location.href = "../";
}

function changeName() {
  const newName = newNameInput.value;
  if (newName === playerName) {
    showToast("Name change cancelled", "fail");
    closePopup();
    return;
  }

  playerName = newName;
  localStorage.setItem("playerName", playerName);
  playerNameSpan.textContent = playerName;
  showToast("Name changed successfully", "success");
  closePopup();
}

function showPopup() {
  popupOverlay.style.display = "flex";
  setTimeout(() => {
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 50);
    popup.style.transform = "scale(1)";
  }, 125);
  newNameInput.focus();
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

let canClick = true;
function toggleMenu() {
  if (!canClick) return;
  canClick = false;
  setTimeout(() => {
    canClick = true;
  }, 500);
  if (!menuButton.classList.contains("opened")) {
    menuButton.classList.toggle("opened");
    menuButton.textContent = "close";
    showOptions();
  } else {
    menuButton.classList.toggle("opened");
    menuButton.textContent = "menu";
    closeOptions();
  }
}

function showOptions() {
  optionsWrapper.style.padding = "0 1rem 1rem";
  optionsWrapper.style.height = "fit-content";
  options.style.height = "100%";
  options.style.padding = "1rem";
  setTimeout(() => {
    options.style.opacity = "1";
  }, 125);
}

function closeOptions() {
  options.style.height = "0";
  options.style.opacity = "0";
  setTimeout(() => {
    optionsWrapper.style.padding = "0";
    options.style.padding = "0";
  }, 125);
}

let toastTimeout;
function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  toast.classList.add(type);
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.classList.remove(type);
    }, 500);
  }, 1500);
}
