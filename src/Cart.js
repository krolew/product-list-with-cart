import iconCartEmpty from "./assets/images/illustration-empty-cart.svg";
import iconRemoveOrder from "./assets/images/icon-remove-item.svg";
import iconCarbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import iconOrderConfirmed from "./assets/images/icon-order-confirmed.svg";
import {
  Product,
  updateProductButtonsStyle,
  updateProductImgStyle,
  updateDomElements,
} from "./Product";
import { getProductImgThumbnail } from "./Utils";
import Storage from "./Storage";
import { reloadPage } from "./Ui";

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

  getCartListTotalAmountProducts() {
    const totalAmountProducts = this.list.reduce((sum, product) => {
      return (sum += product.amount);
    }, 0);
    return totalAmountProducts;
  }

  getTotalPriceCartList() {
    const totalPrice = this.list.reduce((sum, product) => {
      return (sum += product.price * product.amount);
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

  removeProduct(productName) {
    this.list = this.list.filter((product) => product.name !== productName);
  }

  decreaseProductListAmount(productName) {
    // If amount of product is 1 we will remove this product instead of decrease amount
    if (this.getProduct(productName).amount === 1) {
      this.removeProduct(productName);
      return;
    }

    if (this.getProduct(productName)) {
      this.getCartList().forEach((product) => {
        if (product.name === productName) {
          product.decreaseAmount();
          return;
        }
      });
    }
  }

  increaseProductListAmount(productName) {
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

  // This will work only if addProductToCart is first time invoke for first product
  if (Storage.isCartEmpty()) {
    removeEmptyCart();
    renderCartSummary();
    handleDeleteProductBtn();
    handleConfirmBtn();
  }

  Storage.addProduct(product);

  updateProductButtonsStyle(addBtnProduct, btnViewCount);
  updateProductImgStyle(productImg);
  updateCartContainer(product);
  updateAmountCartItemsHeader();
  updateCartTotalPrice();
}

function removeEmptyCart() {
  document.querySelector(".empty-cart").remove();
}

export function removeCartProduct(productName) {
  const cartItemsContainer = document.querySelector(
    ".cart-items-container"
  ).children;

  for (let productContainer of cartItemsContainer) {
    if (productContainer.dataset.productName === productName) {
      productContainer.remove();
      return;
    }
  }
}

export function updateCartProductItemPrice(productName) {
  let cartItemPriceContainer = document.querySelectorAll(
    ".cart-item-price-container[data-product-name]"
  );
  for (let cartItemPriceDiv of cartItemPriceContainer) {
    if (cartItemPriceDiv.dataset.productName === productName) {
      let cartItemAmount = cartItemPriceDiv.children[0];
      let cartItemPriceTotal = cartItemPriceDiv.children[2];

      cartItemAmount.innerHTML = `x${Storage.getProductAmount(productName)}`;
      cartItemPriceTotal.innerHTML = `\$${Storage.getProductTotalPrice(
        productName
      )}`;

      return;
    }
  }
}

export function updateCartTotalPrice() {
  document.querySelector(
    "#cart-price-total"
  ).innerHTML = `\$${Storage.getTotalPriceCart().toFixed(2)}`;
}

export function updateAmountCartItemsHeader() {
  const cartItemsAmountElement = document.querySelector("#cartItems");
  cartItemsAmountElement.innerHTML = Storage.getTotalAmountProducts();
}

export function handleDeleteProductBtn() {
  const productItemsCartContainer = document.querySelector(
    ".cart-items-container"
  );

  productItemsCartContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG" && event.target.id === "deleteProduct") {
      let productName = event.target.dataset.productName;
      Storage.deleteProduct(productName);
      updateDomElements(productName);
    }
  });
}

function processStorageProdcuts() {
  const products = Storage.getProducts();

  products.forEach((product) => {
    renderOrderProductsModal(product);
  });
}

export function handleConfirmBtn() {
  const confirmBtn = document.querySelector("#confirmOrder");
  confirmBtn.addEventListener("click", (e) => {
    renderOrderConfirmModal();
    processStorageProdcuts();
    renderOrderProductSumarry();
    handleBtnOrderNewProject();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function handleBtnOrderNewProject() {
  const btn = document.querySelector(".btn-start-new-order");

  btn.addEventListener("click", () => {
    reloadPage();
  });
}

function updateCartContainer(product) {
  const cartItemsContainer = document.querySelector(".cart-items-container");

  const cartItemTemplate = `
  <div class="cart-item-container" data-product-name="${product.name}">
      <div class="cart-item-container-description">
          <div class="cart-item-description">
              <p class="cart-item-name">${product.name}</p>
              <div class="cart-item-price-container" data-product-name="${
                product.name
              }">
                <p class="cart-item-amount">1x</p>
                <p class="cart-item-price-per-unit">@ \$${parseFloat(
                  product.price
                ).toFixed(2)}</p>
                <p class="cart-item-price-total" >\$${parseFloat(
                  product.price
                ).toFixed(2)}</p>
              </div>
          </div>
      </div>
      <div class="cart-item-cancel-img">
        <img id="deleteProduct" src="${iconRemoveOrder}" 
                  data-product-name="${product.name}" alt="deleteProduct"
        >
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

function renderCartSummary() {
  const cartSummaryTemplate = `
    <div class="cart-summary-container">
      <div class="cart-order-info">
          <p class="cart-order-text">Order Total</p>
          <p id="cart-price-total" class="cart-price-total">\$${Storage.getTotalPriceCart().toFixed(
            2
          )}</p>
      </div>
      <div class="cart-carbon-container">
        <img class="cart-carbon-img" src="${iconCarbonNeutral}">
        <p>This is a <label class="carbon-neutral">carbon-neutral</label> delivery</p>    
      </div>
      <button id="confirmOrder" class="btn-confirm-order">Confirm Order</button>
    </div>
  `;

  const cartProductElement = document
    .createRange()
    .createContextualFragment(cartSummaryTemplate);

  // Append empty Cart Template
  cartContainer.appendChild(cartProductElement);
}

function renderOrderConfirmModal() {
  const orderConfirmModalTemplate = `
  <div class="order-modal-container">
    <div class="order-modal">
      <div class="order-confirmed-img-container">
        <img class="order-confrimed-img" src="${iconOrderConfirmed}">
      </div>
      <div class="order-confirmed-header">
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>    
      </div>
      <div class="order-products-container">

      </div>
      <div class="order-total-price">

      </div>
      <button class="btn-start-new-order">Start New Order</button>
    </div>
  </div>
`;
  const orderModalElement = document
    .createRange()
    .createContextualFragment(orderConfirmModalTemplate);

  document.body.appendChild(orderModalElement);
}

function renderOrderProductsModal(product) {
  const orderProductsContainer = document.querySelector(
    ".order-products-container"
  );

  // console.log(product);
  console.log(getProductImgThumbnail(product.name));

  const orderProductTemplate = `
  <div class="order-product">
    <img src="${getProductImgThumbnail(product.name)}" alt="product img"> 
    <div class="order-description">
      <h4>${product.name}</h4>
      <div class="order-info">
        <p>${product.amount}x</p>
        <p>@ ${parseFloat(product.price).toFixed(2)}</p>
      </div>
    </div>
    <p class="order-product-total">\$${product.totalPrice}</p>
  </div>
`;

  const orderProductElement = document
    .createRange()
    .createContextualFragment(orderProductTemplate);

  orderProductsContainer.appendChild(orderProductElement);
}

function renderOrderProductSumarry() {
  const orderProductsContainer = document.querySelector(
    ".order-products-container"
  );

  const orderProductSumarryTemplate = `<div class="order-product-summary">
  <p>Order Total</p>
  <h2>\$${Storage.getTotalPriceCart().toFixed(2)}</h2>
  </div>`;

  const orderProductElement = document
    .createRange()
    .createContextualFragment(orderProductSumarryTemplate);

  orderProductsContainer.appendChild(orderProductElement);
}
