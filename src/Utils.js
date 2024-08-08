import productData from "./data.json";

export function getProductImgThumbnail(productName) {
  // console.log(productData.filter((product) => product.name === productName));
  const product = productData.filter((product) => {
    return product.name === productName;
  })[0];
  return product.image.thumbnail;
}
