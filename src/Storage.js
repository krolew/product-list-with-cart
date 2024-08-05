import { Cart } from "./Cart";
import { Product } from "./Product";

class Storage {
  getCartList() {
    let cartData = localStorage.getItem("CartList");
    let parsedData = cartData ? JSON.parse(cartData) : {};

    let cartList = Object.assign(new Cart(), parsedData);

    cartList.setCart(
      cartList
        .getCartList()
        .map((product) => Object.assign(new Product(), product))
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

  deleteProduct(product) {
    let cartList = this.getCartList();
    cartList.removeProduct(product);
    this.saveCartList(cartList);
  }
}

export default new Storage();
