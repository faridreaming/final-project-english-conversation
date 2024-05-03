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
const changeNameButton = document.querySelector(".change-name-button");
const resetProgressButton = document.querySelector(".restart-progress-button");

changeNameButton.addEventListener("click", handleChangeName);
function handleChangeName() {
  const newNameInput = `<input type="text" placeholder="Your name" spellcheck="false" value="${playerName}">`;
  showPopup("change-name", "Please enter your new name", newNameInput, [
    "Cancel",
    "Confirm",
  ]);
  const changeNameForm = document.querySelector(".popup-form.change-name");
  changeNameForm.addEventListener("submit", handleChangeNameSubmit);
  changeNameForm.addEventListener("reset", (event) => {
    event.preventDefault();
    closePopup();
    showToast("Name change cancelled", "fail");
    setTimeout(() => {
      newNameInput.value = playerName;
    }, 125);
  });
}

resetProgressButton.addEventListener("click", restartProgress);
// Functions
function restartProgress() {
  showPopup(
    "restart-progress",
    "Are you sure you want to restart your progress?",
    "",
    ["No", "Yes"]
  );
  const resetProgressForm = document.querySelector(
    ".popup-form.restart-progress"
  );
  resetProgressForm.addEventListener("submit", () => {
    localStorage.removeItem("playerName");
    window.location.href = "../";
  });
  resetProgressForm.addEventListener("reset", closePopup);
}

function changeName() {
  const newName = document.querySelector(".popup-form.change-name input").value;
  if (!newName || newName === playerName) {
    showToast("Name change cancelled", "fail");
    closePopup();
    return;
  }
  playerName = newName;
  playerNameSpan.textContent = playerName;
  console.log(`${playerName} success changed to ${newName}`);
  showToast("Name changed successfully", "success");
  closePopup();
}

function handleChangeNameSubmit(event) {
  event.preventDefault();
  changeName();
  const changeNameForm = document.querySelector(".popup-form.change-name");
  changeNameForm.removeEventListener("submit", handleChangeNameSubmit);
}

// Popups
const popupOverlay = document.querySelector(".popup-overlay");
const popup = popupOverlay.querySelector(".popup");
const popupForm = popup.querySelector(".popup-form");
const popupMessage = popup.querySelector(".popup-message");
const popupElement = popup.querySelector(".popup-element");
const noButton = popup.querySelector(".no");
const yesButton = popup.querySelector(".yes");

function showPopup(popUpName, message, element, buttonText) {
  popupForm.classList.add(popUpName);
  popupMessage.textContent = message;
  popupElement.innerHTML = element;
  noButton.textContent = buttonText[0];
  yesButton.textContent = buttonText[1];
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
