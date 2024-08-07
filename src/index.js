import "normalize.css";
import "./css/index.css";
import loadPage from "./Ui";

window.addEventListener("load", () => {
  localStorage.clear();
});

loadPage();
