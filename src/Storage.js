import { Cart } from "./Cart";
import { Product } from "./Product";

class Storage {
  getCartList() {
    let cartData = localStorage.getItem("CartList");
    let parsedData = cartData ? JSON.parse(cartData) : {};

    let cartList = Object.assign(new Cart(), parsedData);

    cartList.setCart(
      cartList.getCartList().map((product) => {
        // Assign Object from Storage list to be the class of product
        let productInstance = Object.assign(new Product(), product);

        // Set object price to be Float
        productInstance.price = parseFloat(productInstance.price);

        return productInstance;
      })
    );

    return cartList;
  }

  isCartEmpty() {
    let cartList = this.getCartList();
    return cartList.isListEmpty();
  }

  saveCartList(data) {
    localStorage.setItem("CartList", JSON.stringify(data));
  }

  addProduct(product) {
    let cartList = this.getCartList();
    cartList.addProduct(product);
    this.saveCartList(cartList);
  }

  deleteProduct(productName) {
    let cartList = this.getCartList();
    cartList.removeProduct(productName);
    this.saveCartList(cartList);
  }

  getProduct(productName) {
    let cartList = this.getCartList();
    return cartList.getProduct(productName);
  }

  getProducts() {
    let cartList = this.getCartList();
    return cartList.getCartList();
  }

  getProductTotalPrice(productName) {
    let cartList = this.getCartList();
    return cartList.getProduct(productName).totalPrice;
  }

  getProductAmount(productName) {
    let cartList = this.getCartList();
    let product = cartList.getProduct(productName);

    // there is 1 because if somebody delete product it should update view count btn to 1 and then again if somebody add
    // this 1 is shown
    return product ? product.amount : 1;
  }

  getTotalPriceCart() {
    let cartList = this.getCartList();
    let totalPrice = cartList.getTotalPriceCartList();
    return totalPrice;
  }

  getTotalAmountProducts() {
    let cartList = this.getCartList();
    return cartList.getCartListTotalAmountProducts();
  }

  decreaseProductAmount(productName) {
    let cartList = this.getCartList();
    cartList.decreaseProductListAmount(productName);
    this.saveCartList(cartList);
  }

  increaseProductAmount(productName) {
    let cartList = this.getCartList();
    cartList.increaseProductListAmount(productName);
    this.saveCartList(cartList);
  }
}

export default new Storage();
