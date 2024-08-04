import { getProducts } from "./Product";
import { addProductToCart } from "./Cart";

// const images = require.context("./assets/images", false, /\.(png|jpe?g|gif)$/);
// const imageMap = {};

// images.keys().forEach((key) => {
//   const imageName = key.replace("./", ""); // Usuwa './' z klucza
//   imageMap[imageName] = images(key).default; // Ustawiamy ścieżkę do obrazu
// });

// console.log(imageMap);

const productContainer = document.querySelector(".products-container");
const addBtn = document.querySelector(".add-button");

export default function loadPage() {
  document.addEventListener("DOMContentLoaded", initalizeApp);
}

function initalizeApp() {
  try {
    getProducts();
    initBtns();
  } catch (err) {
    console.log(err);
  }
}

function initBtns() {
  initAddBtn();
}

function initAddBtn() {
  const productContainer = document.querySelector(".products-container");
  productContainer.addEventListener("click", function (event) {
    const action = event.target.dataset.action;

    if (event.target.tagName === "BUTTON") {
      addProductToCart(event.target);
    } else if (event.target.tagName === "IMG") {
      if (action === "increment-product") {
        console.log(event.target);
      } else if (action === "decrement-product") {
        console.log(event.target);
      }
    }
  });
}

function displayProduct(product) {}
