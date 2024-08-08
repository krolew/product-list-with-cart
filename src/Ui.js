import { addProductToCart, renderEmptyCartContainer } from "./Cart";
import {
  getProducts,
  handleProductIncrementButton,
  handleProductDecremenButton,
} from "./Product";

export default function loadPage() {
  document.addEventListener("DOMContentLoaded", initalizeApp);
}

function initalizeApp() {
  try {
    renderEmptyCartContainer();
    getProducts();
    initAddBtn();
  } catch (err) {
    console.log(err);
  }
}

function initAddBtn() {
  const productContainer = document.querySelector(".products-container");
  productContainer.addEventListener("click", function (event) {
    const action = event.target.dataset.action;

    if (event.target.tagName === "BUTTON" && event.target.id === "add-btn") {
      addProductToCart(event.target);
    } else if (event.target.tagName === "IMG") {
      if (action === "increment-product") {
        handleProductIncrementButton(event.target);
      } else if (action === "decrement-product") {
        handleProductDecremenButton(event.target);
      }
    }
  });
}

export function reloadPage() {
  location.reload();
}
