const playerName = localStorage.getItem("playerName");
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
const yesButton = popup.querySelector(".yes");
const noButton = popup.querySelector(".no");
const changeNameButton = document.querySelector(".change-name-button");
changeNameButton.addEventListener("click", showPopup);
noButton.addEventListener("click", () => {
  closePopup();
  showToast("Name change cancelled");
});

// Functions
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
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}
