import iconCartEmpty from "./assets/images/illustration-empty-cart.svg";
import iconRemoveOrder from "./assets/images/icon-remove-item.svg";
import {
  Product,
  updateProductButtonsStyle,
  updateProductImgStyle,
} from "./Product";
import Storage from "./Storage";

export class Cart {
  list = [];

  setCart(list) {
    this.list = list;
  }

  isListEmpty() {
    return this.list.length === 0 ? true : false;
  }

  getCartList() {
    return this.list;
  }

  getTotalPriceCartList() {
    const totalPrice = this.list.reduce((sum, product) => {
      sum += product.price;
    }, 0);

    return totalPrice;
  }

  getProduct(productName) {
    return this.list.find((product) => product.name === productName);
  }

  addProduct(product) {
    if (this.getProduct(product.name)) return;
    this.list.push(product);
  }

  removeProduct(product) {
    this.list = this.list.filter(
      (productCart) => productCart.name !== product.name
    );
  }

  decreseProductAmount(productName) {
    if (this.getProduct(productName)) {
      this.getCartList().forEach((product) => {
        if (product.name == productName) {
          product.decreaseAmount();
          return;
        }
      });
    }
  }

  increaseProductAmount(productName) {
    if (this.getProduct(productName)) {
      this.getCartList().forEach((product) => {
        if (product.name == productName) {
          product.increaseAmount();
          return;
        }
      });
    }
  }
}

const cartContainer = document.querySelector(".cart-container");

export function addProductToCart(event) {
  let btnViewCount = Array.from(event.parentElement.children).find((child) =>
    child.classList.contains("view-count")
  );

  let addBtnProduct = event;
  let productImg = addBtnProduct.previousElementSibling;
  let productName = addBtnProduct.dataset.productName;
  let productPrice = addBtnProduct.dataset.productPrice;
  const product = new Product(productName, productPrice);

  Storage.addProduct(product);

  updateProductButtonsStyle(addBtnProduct, btnViewCount);
  updateProductImgStyle(productImg);
  updateCartContainer(product);
}

function updateCartContainer(product) {
  const cartItemsContainer = document.querySelector(".cart-items-container");

  const cartItemTemplate = `
  <div class="cart-item-container">
      <div class="cart-item-container-description">
          <div class="cart-item-description">
              <p class="cart-item-name">${product.name}</p>
              <div class="cart-item-price-container">
                <p class="cart-item-amount">1x</p>
                <p class="cart-item-price-per-unit">@\$${product.price}</p>
                <p class="cart-item-price-total" >\$${product.price}</p>
              </div>
          </div>
      </div>
      <div class="cart-item-cancel-img">
        <img src="${iconRemoveOrder}" alt="cancel">
      </div>
  `;

  const cartProductElement = document
    .createRange()
    .createContextualFragment(cartItemTemplate);

  cartItemsContainer.appendChild(cartProductElement);
}

export function renderEmptyCartContainer() {
  const cartEmptyTemplate = `
          <h3>Your Cart (<span id="cartItems">0</span>)</h3>
          <div class="cart-items-container">
            <div class="empty-cart">
              <img
                src="${iconCartEmpty}" 
                alt="Empty Cart"
              />
              <p>Your added items will appear here</p>
            </div>
          </div>
  `;

  // Remove all items inside Cart Container
  cartContainer.innerHTML = "";

  const cartProductElement = document
    .createRange()
    .createContextualFragment(cartEmptyTemplate);

  // Append empty Cart Template
  cartContainer.appendChild(cartProductElement);
}
