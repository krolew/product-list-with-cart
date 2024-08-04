import productData from "./data.json";

const productContainer = document.querySelector(".products-container");

export function getProducts() {
  renderProducts(productData);
}

function renderProducts(prodcuts) {
  prodcuts.forEach((product, productId) => {
    renderProduct(product, productId);
  });
}

export function updateProductButtonsStyle(addBtnProduct, btnViewCount) {
  addBtnProduct.style.display = "none";
  btnViewCount.style.display = "flex";
}

export function updateProductImgStyle(imgContainer) {
  imgContainer.classList.add("active-product-img");
}

function renderProduct(product, productId) {
  const productTemplate = `
    <div class="product-item">
        <div class="product-container-img">
            <img class="product-img" src="${require("./assets/images/image-cake-desktop.jpg")}" alt="img">
            <button class="add-button" data-action="add-product">
                    <img src="../assets/images/icon-add-to-cart.svg" alt="addImg">
                    Add to Cart
                </button>
                <button class="view-count" product-id="${productId}">
                    <img src="./assets/images/icon-decrement-quantity.svg" data-action="decrement-product" alt="decrement(-)" data-increment="">
                    <p class="product-counter" data-item-count="${1}">1</p>
                    <img src="./assets/images/icon-increment-quantity.svg" data-action="increment-product" alt="increment(+)">
                </button>
                
            </div>
            <div class="product-description">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price" >\$${product.price}</p>
            </div>
        </div>
    `;

  const productElement = document
    .createRange()
    .createContextualFragment(productTemplate);
  productContainer.appendChild(productElement);
}
