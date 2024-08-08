import productData from "./data.json";
import decrementIcon from "./assets/images/icon-decrement-quantity.svg";
import incrementIcon from "./assets/images/icon-increment-quantity.svg";
import addToCartIcon from "./assets/images/icon-add-to-cart.svg";
import Storage from "./Storage";
import {
  renderEmptyCartContainer,
  removeCartProduct,
  updateCartTotalPrice,
  updateAmountCartItemsHeader,
  updateCartProductItemPrice,
} from "./Cart";

export class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.amount = 1;
  }

  decreaseAmount() {
    if (this.amount > 0 && this.amount < 100) {
      this.amount--;
    }
  }

  increaseAmount() {
    if (this.amount < 99) this.amount++;
  }

  get totalPrice() {
    return parseFloat(this.price * this.amount).toFixed(2);
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

function updatePorductButtonsStyleDefault(addBtnProduct, btnViewCount) {
  if (btnViewCount.style.display === "flex") {
    btnViewCount.style.display = "none";
    addBtnProduct.style.display = "block";
  }
}

export function updateProductImgStyle(imgProduct) {
  if (imgProduct.classList.contains("active-product-img")) {
    imgProduct.classList.remove("active-product-img");
  } else {
    imgProduct.classList.add("active-product-img");
  }
}

function updateProductCountText(productCountText, productName) {
  productCountText.innerHTML = Storage.getProductAmount(productName);
}

export function handleProductIncrementButton(event) {
  let productName = event.parentNode.dataset.productName;
  Storage.increaseProductAmount(productName);
  updateDomElements(productName);
}

export function handleProductDecremenButton(event) {
  let productName = event.parentNode.dataset.productName;

  Storage.decreaseProductAmount(productName);
  updateDomElements(productName);
}

export function updateDomElements(productName) {
  let viewCountBtn = document.querySelector(
    `.view-count[data-product-name="${productName}"]`
  );

  let addBtnProduct = document.querySelector(
    `#add-btn[data-product-name="${productName}"]`
  );

  let productImg = document.querySelector(
    `.product-img[data-product-name="${productName}"]`
  );

  let viewCountBtnText = document.querySelector(
    `.product-counter[data-product-name="${productName}"]`
  );

  updateProductCountText(viewCountBtnText, productName);

  // After decrease Product Amount or if we delte product, first we check if there are any elements in the cart
  if (Storage.isCartEmpty()) {
    renderEmptyCartContainer();
    updateProductImgStyle(productImg);
    updatePorductButtonsStyleDefault(addBtnProduct, viewCountBtn);
    return;
  }
  // After decrease Product Amount or if we delete product, check if our item is deleted
  else if (Storage.getProduct(productName) === undefined) {
    removeCartProduct(productName);
    updateProductImgStyle(productImg);
    updatePorductButtonsStyleDefault(addBtnProduct, viewCountBtn);
  } else {
    // If product is not deleted, amount decrease, and prices changed;
    // updateProductCountText(viewCountBtnText, productName);
    updateCartProductItemPrice(productName);
  }

  // Do it anyway
  // updateProductCountText(viewCountBtnText, productName);
  updateAmountCartItemsHeader();
  updateCartTotalPrice();
}

function renderProduct(product) {
  const productTemplate = `
    <div class="product-item">
        <div class="product-container-img" data-product-name="${product.name}">
            <img class="product-img" 
              data-product-name="${product.name}"
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
                    <p class="product-counter" data-product-name="${
                      product.name
                    }">1</p>
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
