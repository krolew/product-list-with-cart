import productData from "./data.json";
import decrementIcon from "./assets/images/icon-decrement-quantity.svg";
import incrementIcon from "./assets/images/icon-increment-quantity.svg";
import addToCartIcon from "./assets/images/icon-add-to-cart.svg";
import Storage from "./Storage";
import { renderEmptyCartContainer } from "./Cart";

export class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.amount = 1;
  }

  decreaseAmount() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  increaseAmount() {
    this.amount++;
  }
}

const productContainer = document.querySelector(".products-container");

export function getProducts() {
  renderProducts(productData);
}

function renderProducts(prodcuts) {
  prodcuts.forEach((product) => {
    renderProduct(product);
  });
}

export function updateProductButtonsStyle(addBtnProduct, btnViewCount) {
  addBtnProduct.style.display = "none";
  btnViewCount.style.display = "flex";
}

export function updateProductImgStyle(imgContainer) {
  if (imgContainer.classList.contains("active-product-img")) {
    imgContainer.classList.remove("active-product-img");
  } else {
    imgContainer.classList.add("active-product-img");
  }
}

function updateAmountDom(amountNumber) {}

export function handleProductIncrementButton(event) {
  const productName = event.parentNode.dataset.productName;
  Storage.increaseProductAmount(productName);
}

export function handleProductDecremenButton(event) {
  const viewCountBtn = event.parentNode;
  const productName = viewCountBtn.dataset.productName;
  const imgContainer =
    viewCountBtn.previousElementSibling.previousElementSibling;

  console.log(imgContainer.classList);
  console.log(imgContainer);

  Storage.decreaseProductAmount(productName);

  if (Storage.isCartEmpty()) {
    renderEmptyCartContainer();
    updateProductImgStyle(imgContainer);
  }
}

function renderProduct(product) {
  const productTemplate = `
    <div class="product-item">
        <div class="product-container-img">
            <img class="product-img" 
              srcset="${product.image.mobile} 654w,
                      ${product.image.tablet} 427w,
                      ${product.image.desktop} 502w"
              sizes="(max-width: 375px) 654px, (max-width: 800px) 427px, 502px"
              src="${product.image.desktop}" alt="product-img"
            >
            <button id="add-btn" class="add-button" data-action="add-product" data-product-name="${
              product.name
            }" data-product-price="${product.price}">
                    <img src="${addToCartIcon}" alt="addImg">
                    Add to Cart
                </button>
                
                <button class="view-count" data-product-name="${
                  product.name
                }" data-product-price="${parseFloat(product.price).toFixed(2)}">
                    <img src="${decrementIcon}" data-action="decrement-product" alt="decrement(-)" data-increment="">
                    <p class="product-counter" data-item-count="${1}">1</p>
                    <img src="${incrementIcon}" data-action="increment-product" alt="increment(+)">
                </button>
            </div>
            <div class="product-description">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price" >\$${parseFloat(product.price).toFixed(
                  2
                )}</p>
            </div>
        </div>
    `;

  const productElement = document
    .createRange()
    .createContextualFragment(productTemplate);
  productContainer.appendChild(productElement);
}
