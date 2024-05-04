const page = document.querySelector("meta[name=page]").content;
const playerName = localStorage.getItem("playerName");

document.addEventListener("DOMContentLoaded", () => {
  switch (page) {
    case "login":
      console.log(page);
      if (playerName) window.location.href = "./game/";
      else document.body.style.display = "flex";
      break;
    case "game":
      console.log(page);
      if (!playerName) window.location.href = "../";
      else document.body.style.display = "block";
      break;
  }
});
