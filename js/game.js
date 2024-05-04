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

changeNameButton.addEventListener("click", changeName);
resetProgressButton.addEventListener("click", restartProgress);
// Functions
function changeName() {
  const newNameInput = `<input type="text" placeholder="Your name" spellcheck="false" value="${playerName}">`;
  showPopup("change-name", "Please enter your new name", newNameInput, [
    "Confirm",
    "Cancel",
  ]);
  const changeNameForm = document.querySelector(".popup-form.change-name");
  changeNameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.querySelector(
      ".popup-form.change-name input"
    ).value;
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
  });
  changeNameForm.addEventListener("reset", () => {
    closePopup();
    showToast("Name change cancelled", "fail");
    setTimeout(() => {
      newNameInput.value = playerName;
    }, 125);
  });
}

function restartProgress() {
  showPopup(
    "restart-progress",
    "Are you sure you want to restart your progress?",
    "",
    ["Yes", "No"]
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

// Popups
const popupOverlay = document.querySelector(".popup-overlay");

function showPopup(popUpName, message, element, buttonText) {
  popupOverlay.innerHTML = `
    <div class="popup">
      <form class="popup-form ${popUpName}">
        <p class="popup-message">${message}</p>
        ${element !== "" ? `<div class="popup-element">${element}</div>` : ""}
        <div class="popup-button-wrapper">
          <button class="yes" type="submit">${buttonText[0]}</button>
          <button class="no" type="reset">${buttonText[1]}</button>
        </div>
      </form>
    </div>
  `;
  const popup = popupOverlay.querySelector(".popup");
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
  const popup = popupOverlay.querySelector(".popup");
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
  popupOverlay.innerHTML = "";
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
    menuButton.src = "../assets/icons/close.svg";
    showOptions();
  } else {
    menuButton.classList.toggle("opened");
    menuButton.src = "../assets/icons/menu.svg";
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
