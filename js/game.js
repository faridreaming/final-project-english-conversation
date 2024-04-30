const playerName = localStorage.getItem("playerName");
if (!playerName) window.location.href = "../";

const playerNameSpan = document.querySelector(".player-name-span");
playerNameSpan.textContent = playerName;

const header = document.querySelector("header");
const optionsWrapper = document.querySelector(".options-wrapper");
const options = document.querySelector(".options");

const menuButton = document.querySelector(".hamburger-menu-button");
menuButton.addEventListener("click", () => {
  if (!menuButton.classList.contains("opened")) {
    menuButton.classList.toggle("opened");
    menuButton.textContent = "close";
    showOptions();
  } else {
    menuButton.classList.toggle("opened");
    menuButton.textContent = "menu";
    closeOptions();
  }
});

function showOptions() {
  optionsWrapper.style.padding = "1rem";
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
    options.style.padding = "0";
    optionsWrapper.style.padding = "0";
  }, 125);
}
