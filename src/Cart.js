import { updateProductButtonsStyle, updateProductImgStyle } from "./Product";

export function addProductToCart(event) {
  let btnViewCount = Array.from(event.parentElement.children).find((child) =>
    child.classList.contains("view-count")
  );

  let addBtnProduct = event;
  let imgContainer = event.previousElementSibling;

  updateProductButtonsStyle(addBtnProduct, btnViewCount);
  updateProductImgStyle(imgContainer);
  updateCartContainer();
}

function updateCartContainer() {}
